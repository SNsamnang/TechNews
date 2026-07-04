<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CategoryResource\Pages;
use App\Models\Category;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class CategoryResource extends Resource
{
    protected static ?string $model = Category::class;
    protected static ?string $navigationIcon = 'heroicon-o-tag';
    protected static ?string $navigationLabel = 'ប្រភេទអត្ថបទ';
    protected static ?string $breadcrumb = 'ប្រភេទអត្ថបទ';
    protected static ?string $modelLabel = 'ប្រភេទអត្ថបទ';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')
                ->label('ឈ្មោះអត្ថបទ')
                ->required()
                ->maxLength(100)
                ->live(onBlur: true)
                ->afterStateUpdated(fn($state, callable $set) => $set('slug', Str::slug($state))),

            Forms\Components\TextInput::make('slug')
                ->required()
                ->unique(Category::class, 'slug', ignoreRecord: true)
                ->maxLength(100),

            Forms\Components\Textarea::make('description')
                ->label('សេចក្ដីលំអិត')
                ->rows(3)
                ->columnSpanFull(),

            Forms\Components\ColorPicker::make('color')
                ->label('ពណ៌អក្សរ')
                ->default('#e53e3e'),

            Forms\Components\Toggle::make('is_active')
                ->label('ដំណើរការ')
                ->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ColorColumn::make('color')
                    ->label('ពណ៌'),
                Tables\Columns\TextColumn::make('name')->searchable()->sortable()->label('ប្រភេទ'),
                Tables\Columns\TextColumn::make('slug')->searchable(),
                Tables\Columns\TextColumn::make('posts_count')
                    ->label('ចំនួនមាតិកា')
                    ->counts('posts')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')->boolean()
                    ->label('ដំណើរការ'),
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                    ->icon('heroicon-o-pencil-square')
                    ->color('warning')
                    ->label('កែសម្រួល')
                    ->button(),

                Tables\Actions\DeleteAction::make()
                    ->icon('heroicon-o-trash')
                    ->color('danger')
                    ->label('លុប')
                    ->button()
                    ->requiresConfirmation()
                    ->modalHeading('បញ្ជាក់ការលុប')
                    ->modalDescription('តើអ្នកពិតជាចង់លុបទិន្នន័យនេះមែនទេ?')
                    ->modalSubmitActionLabel('លុប')
                    ->modalCancelActionLabel('បោះបង់')
                    ->successNotificationTitle('លុបដោយជោគជ័យ'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListCategories::route('/'),
            'create' => Pages\CreateCategory::route('/create'),
            'edit'   => Pages\EditCategory::route('/{record}/edit'),
        ];
    }
    public static function getNavigationLabel(): string
    {
        return 'ប្រភេទអត្ថបទ';
    }
}
