import QRCode from 'qrcode';

const GenerateQR = () => {
    let image;
    QRCode.toDataURL('text', function (err, url) {
        if (err) throw err
        else if (url) {
            console.log(url);
            image = `<img src=https://${url} alt='qrcode' />`;}
            return image;
    })
}

export default GenerateQR