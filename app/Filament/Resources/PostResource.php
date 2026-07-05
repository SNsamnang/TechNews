<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PostResource\Pages;
use App\Models\Post;
use App\Models\Tag;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;
    protected static ?string $navigationIcon = 'heroicon-o-newspaper';
    protected static ?string $navigationLabel = 'អត្ថបទ';
    protected static ?string $breadcrumb = 'អត្ថបទ';
    protected static ?string $modelLabel = 'អត្ថបទ';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('បង្កើតថ្មី')
                ->schema([
                    Forms\Components\TextInput::make('title')
                        ->label('ចំណងជើង')
                        ->required()
                        ->maxLength(250)
                        ->live(onBlur: true)
                        ->afterStateUpdated(function (string $state, callable $set) {
                            $set('slug', Str::slug($state));
                        }),

                    Forms\Components\TextInput::make('slug')
                        ->required()
                        ->unique(Post::class, 'slug', ignoreRecord: true)
                        ->maxLength(255),

                    Forms\Components\Textarea::make('excerpt')
                        ->label('ដកស្រង់')
                        ->rows(3)
                        ->maxLength(500)
                        ->columnSpanFull(),

                    Forms\Components\RichEditor::make('body')
                        ->label('សេចក្ដីសង្ខេប')
                        ->required()
                        ->toolbarButtons([
                            'attachFiles',
                            'blockquote',
                            'bold',
                            'bulletList',
                            'codeBlock',
                            'h2',
                            'h3',
                            'italic',
                            'link',
                            'orderedList',
                            'redo',
                            'strike',
                            'underline',
                            'undo',
                        ])
                        ->columnSpanFull(),
                ])->columns(2),
            Forms\Components\Section::make('Media & Taxonomy')
                ->schema([
                    Forms\Components\Select::make('media_type')
                        ->label('ប្រភេទអត្ថបទ')
                        ->options([
                            'image' => 'Image',
                            'video_upload' => 'Upload Video',
                        ])
                        ->default('image')
                        ->live()
                        ->required(),

                    Forms\Components\FileUpload::make('thumbnail')
                        ->label('រូបភាព / វីដេអូ (1080x600)')
                        ->directory('ads')
                        ->visible(
                            fn($get) =>
                            in_array(
                                $get('media_type'),
                                ['image', 'video_upload']
                            )
                        )
                        ->required(
                            fn($get) =>
                            in_array(
                                $get('media_type'),
                                ['image', 'video_upload']
                            )
                        )
                        ->acceptedFileTypes([
                            'image/jpeg',
                            'image/png',
                            'image/webp',
                            'video/mp4',
                            'video/webm',
                            'video/ogg',
                            'video/mov',
                        ]),
                    Forms\Components\Select::make('category_id')
                        ->label('ប្រភេទអត្ថបទ')
                        ->relationship('category', 'name')
                        ->searchable()
                        ->preload()
                        ->required(),

                    Forms\Components\Select::make('tags')
                        ->label('ស្លាក')
                        ->relationship('tags', 'name')
                        ->multiple()
                        ->searchable()
                        ->preload()
                        ->createOptionForm([
                            Forms\Components\TextInput::make('name')->required(),
                            Forms\Components\TextInput::make('slug')
                                ->required()
                                ->unique(Tag::class, 'slug'),
                        ]),
                ])->columns(2),

            Forms\Components\Section::make('Publishing')
                ->schema([
                    Forms\Components\Toggle::make('is_published')
                        ->label('បង្ហោះអត្ថបទ')
                        ->live()
                        ->afterStateUpdated(function ($state, callable $set) {
                            if ($state) $set('published_at', now());
                        }),

                    Forms\Components\Toggle::make('is_featured')
                        ->label('បញ្ចូលជាអត្ថបទជាស្លាយ'),

                    Forms\Components\Toggle::make('is_breaking')
                        ->label('បញ្ចូលជាព័តមានថ្មីៗ'),

                    Forms\Components\DateTimePicker::make('published_at')
                        ->label('កាលបរិច្ឆេទ និងម៉ោង')
                        ->locale('km')
                        ->native(false)
                        ->displayFormat('d/m/Y h:i A')
                        ->nullable(),
                ])->columns(3),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ViewColumn::make('thumbnail')
                    ->label('រូបភាព')
                    ->view('filament.columns.media-preview'),
                Tables\Columns\TextColumn::make('media_type')
                    ->label('មេឌៀ')
                    ->badge()
                    ->formatStateUsing(function ($state) {
                        return $state === 'video_upload'
                            ? '🎥 វីដេអូ'
                            : '🖼️ រូបភាព';
                    })
                    ->color(function ($state) {
                        return $state === 'video_upload'
                            ? 'success'
                            : 'primary';
                    }),

                Tables\Columns\TextColumn::make('title')
                    ->label('ចំណងជើង')
                    ->searchable()
                    ->sortable()
                    ->limit(60)
                    ->wrap(),

                Tables\Columns\TextColumn::make('category.name')
                    ->label('ប្រភេទអត្ថបទ')
                    ->badge()
                    ->color('primary')
                    ->sortable(),

                Tables\Columns\IconColumn::make('is_published')
                    ->label('បោះពុម្ព')
                    ->boolean(),

                Tables\Columns\TextColumn::make('views')
                    ->label('ចំនួនមើល')
                    ->width(10)
                    ->sortable()
                    ->numeric(),

                Tables\Columns\TextColumn::make('is_published')
                    ->label('ស្ថានភាព')
                    ->badge()
                    ->formatStateUsing(fn($state) => $state ? 'បានបង្ហោះ' : 'សេចក្ដីព្រាង')
                    ->color(fn($state) => $state ? 'success' : 'red')
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->relationship('category', 'name'),

                Tables\Filters\TernaryFilter::make('is_published'),
            ])
            // ->actions([
            //     Tables\Actions\EditAction::make(),
            //     // ✅ DeleteAction only on existing records (in table row)
            //     Tables\Actions\DeleteAction::make()
            //         ->requiresConfirmation(),
            // ])nth
            ->actions([
                Tables\Actions\EditAction::make()
                    ->icon('heroicon-o-pencil-square')
                    ->color('warning')
                    ->button()
                    ->label('កែសម្រួល')
                    ->requiresConfirmation(),

                Tables\Actions\DeleteAction::make()
                    ->icon('heroicon-o-trash')
                    ->color('danger')
                    ->label('លុប')
                    ->button()
                    ->requiresConfirmation()
                    ->modalHeading('បញ្ជាក់ការលុប')
                    ->modalDescription('តើអ្នកពិតជាចង់លុបអត្ថបទនេះមែនទេ?')
                    ->modalSubmitActionLabel('លុប')
                    ->modalCancelActionLabel('បោះបង់')
                    ->successNotificationTitle('លុបដោយជោគជ័យ'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                ]),

            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'edit'   => Pages\EditPost::route('/{record}/edit'),
        ];
    }
    public static function getNavigationLabel(): string
    {
        return 'អត្ថបទ';
    }
}
