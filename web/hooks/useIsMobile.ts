import { useState, useEffect } from "react";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fungsi untuk cek ukuran layar
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Jalankan saat pertama kali mount
    checkIsMobile();

    // Tambahkan event listener saat window di-resize
    window.addEventListener("resize", checkIsMobile);

    // Bersihkan listener saat component unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
