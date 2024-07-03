import { FileType, application_file_types, image_file_types, text_file_types, video_file_types, zip_file_types } from "@/lib/constants/file-types";
import { fileToBase64 } from "@/lib/utilities/utils";
import React from "react";

enum UploaderType {
  IMAGE = 'image',
  AUDIO_VIDEO = 'audio/video',
  TEXT = 'text',
  APPLICATION = 'application',
  ZIP = 'zip',
  ALL = 'all'
}

interface UseUploaderType {
  acceptList?: FileType[],
  type?: UploaderType
  initialImage?: string
}

export function useUploader({ acceptList, type, initialImage }: UseUploaderType = { type: UploaderType.IMAGE }) {
  const [fileList, setFileList] = React.useState<any[]>([]);
  const [accept, setAccept] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(initialImage);

  async function handleChange({ fileList }: any) {
    const file = await fileToBase64(fileList[0].originFileObj) as string;

    setFileList(fileList);
    setImageUrl(file);
  }

  async function handlePreview(file: any) {
    let src = file?.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file?.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  }

  function beforeUpload(file: File) {
    if (acceptList && !acceptList.includes(file.type as FileType)) {
      return false
    }
    return true
  }

  React.useEffect(() => {
    if (acceptList) {
      setAccept(acceptList.join(", "));
    }
  }, [acceptList]);

  React.useEffect(() => {
    if (!acceptList) {
      const _acceptList: FileType[] = [];

      switch (type) {
        case UploaderType.IMAGE:
          _acceptList.push(...image_file_types);
          break;
        case UploaderType.AUDIO_VIDEO:
          _acceptList.push(...video_file_types);
          break;
        case UploaderType.TEXT:
          _acceptList.push(...text_file_types);
          break;
        case UploaderType.APPLICATION:
          _acceptList.push(...application_file_types);
          break;
        case UploaderType.ZIP:
          _acceptList.push(...zip_file_types);
          break;
        case UploaderType.ALL:
          _acceptList.push(...image_file_types);
          _acceptList.push(...video_file_types);
          _acceptList.push(...text_file_types);
          _acceptList.push(...application_file_types);
          _acceptList.push(...zip_file_types);
          break;
      }
    }
  }, [type, acceptList]);


  return ({
    accept,
    fileList,
    imageUrl,
    loading,
    setLoading,
    setImageUrl,
    setFileList,

    handleChange,
    handlePreview,
    beforeUpload,
  });
}