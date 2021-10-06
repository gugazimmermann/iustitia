import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { getCroppedImg } from "./cropImage";

export interface ImageCropperProps {
  getBlob(blob: Blob): void;
  inputImg: string;
  setShow(show: boolean): void;
}

export const AvatarCropper = ({ getBlob, inputImg, setShow }: ImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.5);
  const [aspect, setAspect] = useState(1);
  const [croppedImage, setCroppedImage] = useState<Blob>();

  const onCropComplete = useCallback(async (_, croppedAreaPixels) => {
    const croppedImage = await getCroppedImg(inputImg, croppedAreaPixels);
    if (croppedImage) setCroppedImage(croppedImage);
  }, []);

  return (
    <div className="fixed z-20 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="h-72 p-2">
            <div className="relative h-full">
              <Cropper
                image={inputImg}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
          </div>
          <div className="m-2 mt-4 bg-white">
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(e)}
            />
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-500 text-white text-base font-medium sm:ml-3 sm:w-auto sm:text-sm`}
              onClick={() => {
                if (croppedImage) getBlob(croppedImage);
                setShow(false);
              }}
            >
              Confirmar
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                setShow(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarCropper;
