import { useEffect, useRef, useState, useTransition } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";
import data from "./db/songs.json";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SongProps,
  AccessRightsProps,
  CreateMusicModalProps,
} from "./types/music-types";
import MusicCard from "./MusicCard";

let defaultAccessRights = {
  create: false,
  read: true,
  update: false,
  delete: false,
};

function MusicApp({
  token,
  accessRights: access,
}: {
  token?: string;
  accessRights?: AccessRightsProps;
}) {
  let accessRights = {
    ...defaultAccessRights,
  };

  if (token && access) {
    accessRights = { ...access };
  }

  const [songs, setSongs] = useState<SongProps[]>(() => {
    return localStorage.getItem("songs")
      ? JSON.parse(localStorage.getItem("songs")!)
      : data.songs;
  });
  const [filter, setFilter] = useState<string>("");
  const [showCreateMusicModal, setShowCreateMusicModal] =
    useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [sort, setSort] = useState<string>("Select...");

  function handleClose() {
    setShowCreateMusicModal(false);
  }

  function onAdd(song: SongProps) {
    setSongs((prevSongs) => {
      storeInLocalStorage([...prevSongs, song]);
      return [...prevSongs, song];
    });

    setShowCreateMusicModal(false);
  }

  function onDelete(id: number) {
    setSongs((prevSongs) => {
      const songs = prevSongs.filter((song) => song.id !== id);
      storeInLocalStorage(songs);
      return songs;
    });
  }

  function onFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
    startTransition(() => {
      setSongs(
        JSON.parse(localStorage.getItem("songs")!).filter((song: SongProps) => {
          return (
            song.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            song.artist.toLowerCase().includes(e.target.value.toLowerCase()) ||
            song.album.toLowerCase().includes(e.target.value.toLowerCase())
          );
        })
      );
    });
  }

  function sortBy(value: string) {
    const data = songs.sort((a, b) => {
      if (value === "title" || value === "artist" || value === "album") {
        return a[value].localeCompare(b[value]);
      }
      return 0;
    });
    setSongs([...data]);
  }

  function storeInLocalStorage(songs: SongProps[]) {
    localStorage.setItem("songs", JSON.stringify(songs));
  }

  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(songs));
  }, []);

  return (
    <>
      <Container>
        <Row className='align-items-center mb-4'>
          <Col>
            <h1 className=' text-success'>Music Library</h1>
          </Col>
          {accessRights.create && (
            <Col xs='auto'>
              <Stack direction='horizontal' gap={2}>
                <Button
                  variant='primary'
                  onClick={() => {
                    setShowCreateMusicModal(true);
                  }}
                >
                  Create
                </Button>
              </Stack>
            </Col>
          )}
        </Row>

        <Form className='mb-4 border rounded p-3'>
          <Row className='mb-4' xs={4}>
            <Col>
              <Form.Group controlId='title'>
                <Form.Label>Search:</Form.Label>
                <Form.Control
                  value={filter}
                  onChange={onFilterChange}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Sort by:</Form.Label>
              <Dropdown
                onSelect={(val, e) => {
                  setSort(val!);
                  e.preventDefault();
                  sortBy(val!);
                }}
              >
                <Dropdown.Toggle
                  variant='outline-secondary'
                  id='dropdown-basic'
                  className='text-capitalize'
                >
                  {sort}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey='title'>Title</Dropdown.Item>
                  <Dropdown.Item eventKey='artist'>Artist</Dropdown.Item>
                  <Dropdown.Item eventKey='album'>Album</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Form>

        <Row xs={1} md={4} className='g-4 mb-4 border-dark'>
          {isPending
            ? "Loading"
            : songs.map((song) => (
                <Col key={song.id} className='d-flex align-items-stretch'>
                  <MusicCard
                    song={song}
                    accessRights={accessRights}
                    onDelete={onDelete}
                  />
                </Col>
              ))}
        </Row>
      </Container>
      <CreateMusicModal
        showCreateMusicModal={showCreateMusicModal}
        handleClose={handleClose}
        onAdd={onAdd}
      />
    </>
  );
}

function CreateMusicModal({
  showCreateMusicModal,
  handleClose,
  onAdd,
}: CreateMusicModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const artistRef = useRef<HTMLInputElement>(null);
  const albumRef = useRef<HTMLInputElement>(null);

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newSong = {
      id: Math.floor(Math.random() * 1000000),
      title: titleRef.current!.value,
      artist: artistRef.current!.value,
      album: albumRef.current!.value,
    };
    onAdd(newSong);
    handleClose();
  }

  return (
    <Modal show={showCreateMusicModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Music</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className='mb-3' controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              ref={titleRef}
              type='text'
              placeholder='Enter title'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='artist'>
            <Form.Label>Artist</Form.Label>
            <Form.Control
              ref={artistRef}
              type='text'
              placeholder='Enter artist'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='album'>
            <Form.Label>Album</Form.Label>
            <Form.Control
              ref={albumRef}
              type='text'
              placeholder='Enter album'
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default MusicApp;
