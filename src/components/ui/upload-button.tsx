import { UploadButton } from "@/lib/uploadthing";

interface UploadThingButtonProps {
  onUploadComplete: (url: string) => void;
}

function UploadThingButton({ onUploadComplete }: UploadThingButtonProps) {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        const url = res[0].ufsUrl;
        onUploadComplete(url);
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}

export default UploadThingButton;
