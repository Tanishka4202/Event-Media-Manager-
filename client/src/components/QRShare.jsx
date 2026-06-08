import { QRCode } from "react-qr-code";

const QRShare = () => {

  return (

    <div className="bg-slate-900 p-10 rounded-3xl mt-20 text-center">

      <h1 className="text-4xl text-green-400 font-bold mb-10">
        Share Gallery
      </h1>

      <div className="bg-white p-5 inline-block rounded-2xl">

        <QRCode
          value="http://localhost:5173/gallery"
          size={220}
        />

      </div>

      <p className="text-gray-400 mt-6">
        Scan QR to access gallery instantly
      </p>

    </div>

  );

};

export default QRShare;