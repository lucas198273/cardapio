import { useState } from "react";

export default function Checkout() {
  const [paymentDone, setPaymentDone] = useState(false);

  // Chave PIX simulada
  const chavePix = "pagamento@soisa.com.br";
  const qrData = `00020101021226830014BR.GOV.BCB.PIX0114${chavePix}5204000053039865405123.455802BR5920Soisa Tattoo Studio6009SAO PAULO62070503***6304ABCD`;

  const handlePayment = () => {
    // Aqui no futuro você conecta no backend ou Mercado Pago
    setPaymentDone(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Pagamento via PIX
        </h1>

        {!paymentDone ? (
          <div className="text-center space-y-4">
            <p className="text-lg font-medium">Escaneie o QR Code:</p>
            <div className="flex justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                  qrData
                )}`}
                alt="QR Code PIX"
                className="rounded-lg border"
              />
            </div>
            <p className="text-sm text-gray-600 break-all">
              Chave PIX: <strong>{chavePix}</strong>
            </p>
            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Já realizei o pagamento
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-green-600">
              ✅ Pagamento confirmado!
            </h2>
            <p className="text-gray-700">
              Em instantes você receberá a confirmação do seu pedido.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
