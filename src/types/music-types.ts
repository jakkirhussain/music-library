export type SongProps = {
  id: number;
  title: string;
  artist: string;
  album: string;
};

export type AccessRightsProps = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

export type CreateMusicModalProps = {
  showCreateMusicModal: boolean;
  handleClose: () => void;
  onAdd: (song: SongProps) => void;
};
