import FilesGrid from "@/components/layouts/FilesGrid";
import FileCard from "@/components/cards/FileCard";
import FolderCard from "@/components/cards/FolderCard";
import { useActionsContext } from "@/contexts/ActionsContext";
import Modal from "../Modal";
import RenameFolderForm from "../forms/RenameFolderForm";
import RenameFileForm from "../forms/RenameFileForm";
import NewFolderForm from "../forms/NewFolderForm";
import useFileRename from "@/hooks/useFileRename";
import useCreateNewFolder from "@/hooks/useCreateNewFolder";
import useFolderRename from "@/hooks/useFolderRename";

export default function FileStorageView({ childFolders, files }) {
  const { state: actionsState } = useActionsContext();
  const { toggleRenameModal: toggleFileRenameModal } = useFileRename();
  const { toggleRenameModal: toggleFolderRenameModal } = useFolderRename();
  const { toggleNewFolderModal } = useCreateNewFolder();

  return (
    <>
      <FilesGrid>
        {childFolders?.length > 0 &&
          childFolders.map((folder) => (
            <FolderCard
              key={folder.id}
              id={folder.id}
              name={folder.folderDetails.name}
            />
          ))}
        {files?.length > 0 &&
          files.map((file) => (
            <FileCard
              key={file.id}
              id={file.id}
              icon="/file_generic.png"
              name={file.fileDetails.name}
            />
          ))}
      </FilesGrid>
      {actionsState.openedFileRenameModal.isOpened && (
        <Modal onClick={toggleFileRenameModal}>
          <RenameFileForm
            currentName={actionsState.openedFileRenameModal.name}
          ></RenameFileForm>
        </Modal>
      )}
      {actionsState.openedFolderRenameModal.isOpened && (
        <Modal onClick={toggleFolderRenameModal}>
          <RenameFolderForm
            currentName={actionsState.openedFolderRenameModal.name}
          ></RenameFolderForm>
        </Modal>
      )}
      {actionsState.openedNewFolderModal.isOpened && (
        <Modal
          onClick={toggleNewFolderModal}
          currentName={actionsState.openedNewFolderModal.name}
        >
          <NewFolderForm></NewFolderForm>
        </Modal>
      )}
    </>
  );
}
