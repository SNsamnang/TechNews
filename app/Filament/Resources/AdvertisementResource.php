<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AdvertisementResource\Pages;
use App\Filament\Resources\AdvertisementResource\RelationManagers;
use App\Models\Advertisement;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AdvertisementResource extends Resource
{
    protected static ?string $model = Advertisement::class;
    protected static ?string $modelLabel = 'អ្នកឧបត្ថម្ភ';
    protected static ?string $navigationLabel = 'អ្នកឧបត្ថម្ភ';
    protected static ?string $breadcrumb = 'អ្នកឧបត្ថម្ភ';
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->label('ឈ្មោះប្រេន')
                    ->required(),

                Forms\Components\Select::make('media_type')
                    ->label('ប្រភេទផ្សព្វផ្សាយ')
                    ->options([
                        'image' => 'រូបភាព',
                        'video_upload' => 'វីឌីអូ',
                        'video_url' => 'លីងវីឌីអូ',
                    ])
                    ->default('image')
                    ->live()
                    ->required(),

                Forms\Components\FileUpload::make('image')
                    ->label('រូបភាព / វីដេអូ')
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
                    ]),

                Forms\Components\TextInput::make('video_url')
                    ->label('លីងវីឌីអូ')
                    ->url()
                    ->visible(
                        fn($get) =>
                        $get('media_type') === 'video_url'
                    )
                    ->required(
                        fn($get) =>
                        $get('media_type') === 'video_url'
                    ),

                Forms\Components\TextInput::make('url')
                    ->label('លីងតំណ')
                    ->url()
                    ->nullable(),

                Forms\Components\Select::make('position')
                    ->label('ទីតាំង')
                    ->options([
                        'popup' => 'Popup',
                        'homepage' => 'Homepage',
                        'sidebar' => 'Sidebar',
                    ])
                    ->required(),

                Forms\Components\Toggle::make('status')
                    ->label('ដំណើរការ')
                    ->default(false)
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('រូបតំណាង'),

                Tables\Columns\TextColumn::make('title')
                    ->label('ឈ្មោះប្រេន'),

                Tables\Columns\BadgeColumn::make('position')
                    ->label('ទីតាំង'),

                Tables\Columns\ToggleColumn::make('status')
                    ->default(true)
                    ->label('ដំណើរការ'),
            ])
            ->filters([
                //
            ])
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
                    ->modalDescription('តើអ្នកពិតជាចង់លុបអ្នកឧបត្ថម្ភនេះមែនទេ?')
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

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAdvertisements::route('/'),
            'create' => Pages\CreateAdvertisement::route('/create'),
            'edit' => Pages\EditAdvertisement::route('/{record}/edit'),
        ];
    }
    public static function getNavigationLabel(): string
    {
        return 'អ្នកឧបត្ថម្ភ';
    }
}
