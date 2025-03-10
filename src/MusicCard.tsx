import { Button, Card, Stack } from "react-bootstrap";
import { SongProps, AccessRightsProps } from "./types/music-types";

type MusicCardProps = {
  song: SongProps;
  accessRights: AccessRightsProps;
  onDelete: (id: number) => void;
};

export default function MusicCard({
  song,
  accessRights,
  onDelete,
}: MusicCardProps) {
  return (
    <Card
      data-testid={`song-card-${song.id}`}
      border='success'
      bg='light'
      key={song.id}
      style={{ width: "18rem" }}
    >
      <Card.Body>
        <Card.Title className='mb-4'>
          <Stack direction='horizontal' gap={2}>
            <span>{song.title}</span>
            {accessRights.delete && (
              <Button
                data-testid={`delete-${song.id}`}
                variant='outline-danger'
                onClick={() => {
                  onDelete(song.id);
                }}
                className='ms-auto'
              >
                &times;
              </Button>
            )}
          </Stack>
        </Card.Title>
        <Card.Text>
          <strong>Artist:</strong> {song.artist}
        </Card.Text>
        <Card.Text>
          <strong>Album:</strong> {song.album}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
