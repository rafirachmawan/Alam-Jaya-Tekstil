const use_mock = true;

export const getData = async (url: string) => {
  if (use_mock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { id: 1, nama: "Hodie Hitam", status: "menunggu" },
            { id: 2, nama: "Jersey Putih", status: "menunggu" },
            { id: 3, nama: "Jersey Bola", status: "menunggu" },
            { id: 4, nama: "Kaos Hitam", status: "menunggu" },
            { id: 5, nama: "Hodie Hitam", status: "menunggu" },
            { id: 6, nama: "Kaos Putih", status: "menunggu" },
            { id: 7, nama: "Hem Putih", status: "proses" },
            { id: 8, nama: "Polo Putih", status: "proses" },
            { id: 9, nama: "Polo Hitam", status: "proses" },
            { id: 10, nama: "Kaos Hijau", status: "proses" },
            { id: 11, nama: "Kaos Merah", status: "selesai" },
          ],
        });
      }, 1000);
    });
  } else {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
};
