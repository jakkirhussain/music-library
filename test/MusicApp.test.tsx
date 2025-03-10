import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import MusicApp from "../src/MusicApp";

describe("MusicApp", () => {
  it("should render MusicApp", () => {
    render(<MusicApp />);
    expect(screen.getByText("Music Library")).toBeInTheDocument();
  });

  it("show the create music form", async () => {
    render(
      <MusicApp
        token={JSON.stringify({
          id: 1,
          name: "admin",
          email: "john@example.com",
          password: "password123",
          role: "admin",
        })}
        accessRights={{
          create: true,
          read: true,
          update: true,
          delete: true,
        }}
      />
    );
    const createButtonElem = screen.getByRole("button", { name: "Create" });
    expect(createButtonElem).toBeInTheDocument();

    await user.click(createButtonElem);

    expect(screen.getByText("Create Music")).toBeInTheDocument();
  });

  it("show and hide the create music form", async () => {
    render(
      <MusicApp
        token={JSON.stringify({
          id: 1,
          name: "admin",
          email: "john@example.com",
          password: "password123",
          role: "admin",
        })}
        accessRights={{
          create: true,
          read: true,
          update: true,
          delete: true,
        }}
      />
    );
    const createButtonElem = screen.getByRole("button", { name: "Create" });
    expect(createButtonElem).toBeInTheDocument();

    await user.click(createButtonElem);

    expect(screen.getByText("Create Music")).toBeInTheDocument();

    const closeButtonElem = screen.getByRole("button", { name: "Close" });

    await user.click(closeButtonElem);

    expect(screen.queryByText("Create Music")).not.toBeInTheDocument();
  });

  it("should create a new music", async () => {
    render(
      <MusicApp
        token={JSON.stringify({
          id: 1,
          name: "admin",
          email: "john@example.com",
          password: "password123",
          role: "admin",
        })}
        accessRights={{
          create: true,
          read: true,
          update: true,
          delete: true,
        }}
      />
    );
    const createButtonElem = screen.getByRole("button", { name: "Create" });
    expect(createButtonElem).toBeInTheDocument();

    await user.click(createButtonElem);

    expect(screen.getByText("Create Music")).toBeInTheDocument();

    const titleElem = screen.getByPlaceholderText("Enter title");
    await user.type(titleElem, "title1");
    expect(titleElem).toHaveValue("title1");

    const artistElem = screen.getByPlaceholderText("Enter artist");
    await user.type(artistElem, "artist1");
    expect(artistElem).toHaveValue("artist1");

    const albumElem = screen.getByPlaceholderText("Enter album");
    await user.type(albumElem, "album1");
    expect(albumElem).toHaveValue("album1");

    const submitButtonElem = screen.getByRole("button", { name: "Submit" });
    expect(submitButtonElem).toBeInTheDocument();

    await user.click(submitButtonElem);
    
    expect(screen.queryByText("Create Music")).not.toBeInTheDocument();

  });

  it("filter music by search", async () => {
    render(
      <MusicApp
        token={JSON.stringify({
          id: 1,
          name: "admin",
          email: "john@example.com",
          password: "password123",
          role: "admin",
        })}
        accessRights={{
          create: true,
          read: true,
          update: true,
          delete: true,
        }}
      />
    );


    const searchElem = screen.getByRole("textbox",{name:"Search:"});


    await user.type(searchElem,"xyz");

    expect(screen.queryByText("xyz")).not.toBeInTheDocument();

  });

  it("filter music by search", async () => {
    render(
      <MusicApp
        token={JSON.stringify({
          id: 1,
          name: "admin",
          email: "john@example.com",
          password: "password123",
          role: "admin",
        })}
        accessRights={{
          create: true,
          read: true,
          update: true,
          delete: true,
        }}
      />
    );


    const deleteElem = screen.getByTestId('delete-1');


    await user.click(deleteElem);

    expect(screen.queryByTestId("song-card-1")).not.toBeInTheDocument();

  });


  


});
