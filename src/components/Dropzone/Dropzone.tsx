/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { ActualFileObject, FilePondInitialFile } from 'filepond';
import './dropzone.scss';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

interface DropZoneProps {
  files?: (string | FilePondInitialFile | Blob | ActualFileObject)[];
  handleFiles: any;
  multiple: boolean;
  maxFiles: number;
  label: string;
  classField?: string;
  required: boolean;
  size?: number;
  filesAccept: string[];
}

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);
export const DropZone = ({
  files,
  handleFiles,
  multiple,
  maxFiles,
  label,
  classField,
  required,
  filesAccept,
}: DropZoneProps) => {
  return (
    <FilePond
      files={files}
      onupdatefiles={(event) => handleFiles(event)}
      allowMultiple={multiple}
      maxFiles={maxFiles}
      labelIdle={label}
      labelFileTypeNotAllowed={'Formato do arquivo inválido!'}
      instantUpload={false}
      fileValidateTypeLabelExpectedTypes={'Aceito apenas {allTypes}'}
      allowFileTypeValidation={true}
      acceptedFileTypes={filesAccept}
      className={classField ? classField : 'default-dropzone'}
      required={required}
    />
  );
};
