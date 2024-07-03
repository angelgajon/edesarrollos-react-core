import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import { UploadProps } from "antd/lib";

export function Uploader({ labelAdd = "Subir Imagen", labelEdit = "Actualizar Imagen", imageUrl, loading, ...props }: UploadProps & { imageUrl?: string, loading?: boolean, labelAdd?: string, labelEdit?: string }) {

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{imageUrl ? labelEdit : labelAdd}</div>
    </button>
  );

  return (
    <div className="flex gap-2">
      {imageUrl && (
        <Image height={100} width={100} src={imageUrl} />
      )}

      <Upload
        listType="picture-card"
        showUploadList={false}
        maxCount={1}

        beforeUpload={props.beforeUpload}
        onChange={props.onChange}
        onPreview={props.onPreview}
        {...props}
      >
        {uploadButton}
      </Upload>
    </div>
  )
}