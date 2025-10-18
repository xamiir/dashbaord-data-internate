import { useState } from "react";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/ui/file-upload";
import { Paperclip, Trash2 } from "lucide-react";
import { FileSvgDraw } from "@/assets/icons";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { observer } from "mobx-react-lite";
import { useStores } from "@/models/helpers";
import toast from "react-hot-toast";

interface FileUploadProps {
  form: UseFormReturn<any, any, undefined>;
  name: any;
  multiple?: boolean;
  maxFiles?: number;
  size?: number;
}

const FileUpload = (props: FileUploadProps) => {
  const {
    commonStore: { uploadFile },
  } = useStores();

  const [files, setFiles] = useState<File[] | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(
    props.form.getValues(props.name) ?? []
  );

  const dropZoneConfig = {
    maxFiles: props.maxFiles || 1,
    maxSize: 1024 * 1024 * 10, // 10MB,
    multiple: props.multiple || false,
  };

  const handleUpload = () => {
    if (files) {
      files.forEach((file) => {
        const formData = new FormData();
        formData.append("file", file);
        const fileType = file.type.split("/")[0];
        uploadFile(formData, fileType)
          .then((res) => {
            props.form.setValue(props.name, res.data);
            res.data.forEach((url: string) => {
              setUploadedFiles([...uploadedFiles, url]);
            });
          })
          .catch(() => {
            toast.error("Failed to upload file");
          });
      });
    }

    setFiles(null);
  };

  return (
    <div>
      <FileUploader
        value={files}
        onValueChange={setFiles}
        dropzoneOptions={dropZoneConfig}
        className="relative bg-background rounded-lg p-2 max-w-md"
      >
        <FileInput className="outline-dashed outline-1 border border-dashed outline-white">
          <div className="flex items-center justify-center flex-col pt-1 pb-2 w-full ">
            <FileSvgDraw />
          </div>
        </FileInput>
        <FileUploaderContent>
          {files &&
            files.length > 0 &&
            files.map((file, i) => (
              <FileUploaderItem key={i} index={i}>
                <Paperclip className="h-4 w-4 stroke-current" />
                <span>{file.name}</span>
              </FileUploaderItem>
            ))}

          {files && files?.length > 0 && (
            <div className="flex justify-end">
              <Button variant="outline" onClick={handleUpload}>
                Upload
              </Button>
            </div>
          )}
        </FileUploaderContent>
      </FileUploader>

      {uploadedFiles.length > 0 && (
        <div className="ml-2 flex gap-2">
          {uploadedFiles.map((url, i) => {
            return url.includes("pdf") ? (
              <embed key={i} src={url} className="w-16 h-16 object-cover" />
            ) : (
              <img
                key={i}
                src={url}
                alt={url}
                className="w-16 h-16 object-cover"
              />
            );
          })}

          <Button
            variant="outline"
            size={"icon"}
            onClick={() => {
              setFiles(null);
              setUploadedFiles([]);
              props.form.setValue(props.name, "");
            }}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default observer(FileUpload);
