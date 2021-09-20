import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotesShow from "./NotesShow";

interface NoteInterface {
  id: string;
  date: string;
  title: string;
  content: string;
}
describe("NotesShow", () => {
  it("should render successfully", () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const setSelectedNote = (selectedNote: NoteInterface) => {}
    const note = {
      id: "AAA",
      date: "01/01/2021 00:00",
      title: "BBB",
      content: "CCC",
    };
    const { baseElement } = render(
      <MemoryRouter>
        <NotesShow note={note} loading={false} setSelectedNote={setSelectedNote} />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
