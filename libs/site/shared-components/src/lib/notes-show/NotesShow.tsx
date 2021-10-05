import { NotesServices } from "@iustitia/site/services";
import { PenIcon, TrashIcon } from "@iustitia/site/icons";

type NotesType = NotesServices.NotesRes;
export interface NoteShowProps {
  note: NotesType;
  loading: boolean;
  setEditNote(editNote: NotesType): void;
  setSelectedNote(selectedNote: NotesType): void;
}

export function NoteShow({ note, loading, setEditNote, setSelectedNote }: NoteShowProps) {
  return (
    <div className="border-b mb-4">
      <div className="flex justify-between pb-2">
        <div>
          <span className="font-bold">{note.title}</span>
          <button
            disabled={loading}
            onClick={() => {
              setEditNote(note);
            }}
          >
          <PenIcon styles="w-4 h-4 inline ml-4 text-primary-500" stroke={2} />
          </button>
        </div>
        <div className="text-sm">
          {note.date}
          <button
            disabled={loading}
            onClick={() => {
              setSelectedNote(note);
            }}
          >
            <TrashIcon styles="w-4 h-4 inline ml-4 text-red-500" stroke={2} />
          </button>
        </div>
      </div>
      <p className="whitespace-pre-line mb-4 text-sm">{note.content}</p>
    </div>
  );
}

export default NoteShow;
