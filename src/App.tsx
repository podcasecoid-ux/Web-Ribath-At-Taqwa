import { useState, useEffect } from 'react';

// ==========================================
// DATA MASTER DEFAULT (BISA DIUBAH TOTAL VIA ADMIN)
// ==========================================
const INITIAL_DATA = {
  theme: {
    primaryColor: "#10b981",
    logoUrl: "", 
    fotoProfilUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    whatsappNumber: "6281234567890",
    whatsappMessage: "Assalamu'alaikum Wr. Wb. Mohon info pendaftaran di Ribath At-Taqwa...",
    fontStyle: "font-sans", 
    bannerDarkness: 45 
  },
  banners: [
    { id: 1, url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80" },
    { id: 2, url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80" },
    { id: 3, url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80" }
  ],
  navigation: [
    { id: "profil", label: "Profil" },
    { id: "program", label: "Program" },
    { id: "jadwal", label: "Jadwal" },
    { id: "ppdb", label: "PPDB" },
    { id: "kontak", label: "Kontak" }
  ],
  hero: {
    title: "Mencetak Generasi Rabbani, Berakhlaq Mulia & Berwawasan Luas",
    subtitle: "Pesantren Ribath At-Taqwa memadukan kurikulum salafiyah yang otentik dengan pengembangan karakter modern untuk melahirkan ulama dan pemimpin masa depan.",
    subtitleAlign: "center", 
    ctaPrimary: "Daftar PPDB Online",
    ctaSecondary: "Pelajari Program"
  },
  stats: [
    { id: 1, label: "Santri Aktif", value: "450+" },
    { id: 2, label: "Asatidzah", value: "35" },
    { id: 3, label: "Program Studi", value: "4" },
    { id: 4, label: "Alumni", value: "1,200+" }
  ],
  profil: {
    sejarah: "Didirikan dengan visi yang kuat untuk membentengi aqidah umat, Pesantren Ribath At-Taqwa terus konsisten mencetak kader dakwah yang mumpuni.",
    sejarahAlign: "left",
    visi: "Menjadi pusat pendidikan Islam berstandar internasional yang unggul dalam ilmu syar'i dan kokoh dalam karakter kompetitif.",
    misi: [
      "Menyelenggarakan pendidikan tahfidz Al-Qur'an dan mutun ilmiah secara mutqin.",
      "Mengajarkan kitab-kitab para ulama mu'tabarah dengan sanad yang bersambung.",
      "Membekali santri dengan kecakapan hidup (life skills) dan bahasa asing aktif."
    ]
  },
  programs: [
    { id: 1, name: "Tahfidzul Qur'an Mutqin", desc: "Program intensif menghafal Al-Qur'an 30 juz disertai dengan tajwid mendalam dan pemahaman makna ayat." },
    { id: 2, name: "Madrasah Tsanawiyah (MTs)", desc: "Pendidikan formal tingkat menengah formal yang diintegrasikan dengan kurikulum kepesantrenan." },
    { id: 3, name: "Madrasah Aliyah (MA)", desc: "Fokus pada pendalaman ilmu syari'ah, persiapan studi ke Timur Tengah, dan ujian nasional." },
    { id: 4, name: "Takhassus Kitab Turots", desc: "Program khusus paska-Aliyah untuk pendalaman kitab kuning, ushul fiqh, dan bahasa Arab tingkat lanjut." }
  ],
  jadwal: [
    { id: 1, waktu: "03.30 - 05.00", kegiatan: "Qiyamul Lail, Shalat Subuh Berjamaah & Zikir Pagi" },
    { id: 2, waktu: "05.00 - 06.30", kegiatan: "Halaqah Tahfidz Al-Qur'an & Setoran Hafalan" },
    { id: 3, waktu: "07.30 - 12.00", kegiatan: "KBM Kurikulum Formal & Kepesantrenan" },
    { id: 4, waktu: "13.30 - 15.00", kegiatan: "Istirahat Siang & Pendalaman Bahasa Mandiri" },
    { id: 5, waktu: "16.00 - 17.30", kegiatan: "Kajian Kitab Kuning / Turots sore bersama Asatidzah" },
    { id: 6, waktu: "18.30 - 21.00", kegiatan: "Maghrib Berjamaah, Makan Malam & Halaqah Malam" }
  ],
  ppdb: {
    status: "Buka",
    gelombang: "Gelombang I (1 Mei - 30 Juni 2026)",
    biayaPendaftaran: "Rp 250.000",
    syarat: [
      "Mengisi formulir pendaftaran online/offline",
      "Fotokopi Akta Kelahiran & Kartu Keluarga (3 Lembar)",
      "Fotokopi Ijazah terakhir atau Rapor 2 semester terakhir",
      "Pas foto berlatar merah ukuran 3x4 dan 4x6"
    ]
  },
  kontak: {
    alamat: "Jl. Pesantren No. 45, Kompleks Ribath At-Taqwa, Indonesia",
    telepon: "+62 812-3456-7890",
    email: "info@ribathattaqwa.sch.id"
  }
};

export default function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('logo-tampilan');
  const [currentSlide, setCurrentSlide] = useState(0);

  const [ppdbForm, setPpdbForm] = useState({ nama: '', asalSekolah: '', noHp: '', programPilihan: "Tahfidzul Qur'an Mutqin" });
  const [ppdbSuccess, setPpdbSuccess] = useState(false);

  // STATE TEMPORER UNTUK EDITING DI PANEL ADMIN
  const [editTheme, setEditTheme] = useState({ ...INITIAL_DATA.theme });
  const [editBanners, setEditBanners] = useState([...INITIAL_DATA.banners]);
  const [editNavigation, setEditNavigation] = useState([...INITIAL_DATA.navigation]);
  const [editHero, setEditHero] = useState({ ...INITIAL_DATA.hero });
  const [editStats, setEditStats] = useState([...INITIAL_DATA.stats]);
  const [editProfil, setEditProfil] = useState({ ...INITIAL_DATA.profil });
  const [editPrograms, setEditPrograms] = useState([...INITIAL_DATA.programs]);
  const [editJadwal, setEditJadwal] = useState([...INITIAL_DATA.jadwal]);
  const [editPpdb, setEditPpdb] = useState({ ...INITIAL_DATA.ppdb });
  const [editKontak, setEditKontak] = useState({ ...INITIAL_DATA.kontak });

  // State input tambahan untuk list Misi & Syarat PPDB baru
  const [newMisiText, setNewMisiText] = useState("");
  const [newSyaratText, setNewSyaratText] = useState("");

  useEffect(() => {
    if (data.banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data.banners]);

  const handleLogoOrProfileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logoUrl' | 'fotoProfilUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditTheme(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBannerFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditBanners([...editBanners, { id: Date.now(), url: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePpdbSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ppdbForm.nama && ppdbForm.noHp) {
      setPpdbSuccess(true);
      setTimeout(() => {
        setPpdbSuccess(false);
        setPpdbForm({ nama: '', asalSekolah: '', noHp: '', programPilihan: data.programs[0]?.name || "" });
      }, 5000);
    }
  };

  const saveAllChanges = () => {
    setData({
      theme: editTheme,
      banners: editBanners,
      navigation: editNavigation,
      hero: editHero,
      stats: editStats,
      profil: editProfil,
      programs: editPrograms,
      jadwal: editJadwal,
      ppdb: editPpdb,
      kontak: editKontak
    });
    setCurrentSlide(0);
    setIsAdminOpen(false);
    alert('Alhamdulillah! Seluruh perubahan komponen menu berhasil diterapkan ke layar.');
  };

  const getAlignClass = (alignValue: string) => {
    if (alignValue === 'center') return 'text-center';
    if (alignValue === 'right') return 'text-right';
    if (alignValue === 'justify') return 'text-justify';
    return 'text-left';
  };

  const targetWhatsappUrl = `https://wa.me/${data.theme.whatsappNumber}?text=${encodeURIComponent(data.theme.whatsappMessage)}`;
  const darknessOpacity = data.theme.bannerDarkness / 100;

  return (
    <div className={`min-h-screen bg-slate-900 text-slate-100 antialiased relative ${data.theme.fontStyle}`}>
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* LOGO & NAMA */}
            <div className="flex items-center gap-3">
              {data.theme.logoUrl ? (
                <img src={data.theme.logoUrl} alt="Logo" className="h-12 w-12 object-cover rounded-xl border border-slate-700 shadow-md bg-slate-900" />
              ) : (
                <div style={{ backgroundColor: data.theme.primaryColor }} className="p-2.5 rounded-xl shadow-lg">
                  <svg className="h-6 w-6 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
              )}
              <div>
                <span className="text-xs sm:text-sm font-bold tracking-tight text-white block uppercase">Ribath At-Taqwa</span>
                <span style={{ color: data.theme.primaryColor }} className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase block">Halaman Resmi</span>
              </div>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center gap-6">
              {data.navigation.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="text-xs lg:text-sm font-medium text-slate-300 hover:text-white capitalize transition-colors">{item.label}</a>
              ))}
              <button onClick={() => setIsAdminOpen(true)} style={{ backgroundColor: data.theme.primaryColor }} className="text-slate-950 hover:brightness-110 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg">
                 Panel Admin
              </button>
            </div>

            {/* Menu Trigger Mobile */}
            <div className="md:hidden flex items-center gap-2">
              <button onClick={() => setIsAdminOpen(true)} style={{ backgroundColor: data.theme.primaryColor }} className="text-slate-950 rounded-lg text-[10px] font-bold px-2.5 py-1.5">Admin</button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-slate-800 rounded-lg text-slate-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-t border-slate-800 px-4 py-3 space-y-2">
            {data.navigation.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-slate-300 hover:text-white">{item.label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO BANNER SLIDER */}
      <header className="relative w-full overflow-hidden bg-slate-950 border-b border-slate-800 min-h-[460px] sm:min-h-[520px] lg:h-[580px] flex items-center">
        <div className="absolute inset-0 z-0">
          {data.banners.map((slide, idx) => (
            <div
              key={slide.id}
              style={{ backgroundImage: `url(${slide.url})` }}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform ${
                idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              }`}
            >
              <div style={{ backgroundColor: `rgba(15, 23, 42, ${darknessOpacity})` }} className="absolute inset-0 transition-all duration-300 backdrop-blur-[1px]" />
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center w-full py-12">
          <span style={{ backgroundColor: `${data.theme.primaryColor}15`, color: data.theme.primaryColor, borderColor: `${data.theme.primaryColor}30` }} className="inline-block px-3 py-1 rounded-full text-[10px] lg:text-xs font-bold border mb-4 uppercase tracking-widest">Ma'had Al-Qur'an & Turots</span>
          <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-4 leading-snug sm:leading-tight max-w-4xl mx-auto">
            {data.hero.title}
          </h1>
          <p className={`text-xs sm:text-sm lg:text-base text-slate-200/90 max-w-2xl mx-auto mb-8 font-normal leading-relaxed px-2 ${getAlignClass(data.hero.subtitleAlign)}`}>
            {data.hero.subtitle}
          </p>
          <div className="flex flex-row justify-center items-center gap-3 max-w-md mx-auto">
            <a href="#ppdb" style={{ backgroundColor: data.theme.primaryColor }} className="text-slate-950 font-extrabold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-xl transition-all hover:scale-105 whitespace-nowrap">{data.hero.ctaPrimary}</a>
            <a href="#profil" className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 text-slate-200 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm hover:bg-slate-800 transition-all whitespace-nowrap">{data.hero.ctaSecondary}</a>
          </div>
        </div>
      </header>

      {/* STATISTIK */}
      <section className="-mt-6 max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-950/95 backdrop-blur border border-slate-800 p-4 rounded-2xl shadow-2xl">
          {data.stats.map(s => (
            <div key={s.id} className="text-center p-2 flex flex-col justify-center items-center">
              <span style={{ color: data.theme.primaryColor }} className="text-xl sm:text-2xl font-black block mb-0.5">{s.value}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROFIL SECTION */}
      <section id="profil" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-5 rounded-2xl shadow-xl">
            {data.theme.fotoProfilUrl && (
              <img src={data.theme.fotoProfilUrl} alt="Profil" className="w-full h-44 sm:h-56 object-cover rounded-xl mb-4 border border-slate-800" />
            )}
            <h3 style={{ color: data.theme.primaryColor }} className="text-sm font-black uppercase tracking-wider mb-2">Sejarah Lembaga</h3>
            <p className={`text-slate-300 text-xs leading-relaxed mb-5 ${getAlignClass(data.profil.sejarahAlign)}`}>
              {data.profil.sejarah}
            </p>
            <div className="border-t border-slate-800 pt-4">
              <h3 className="text-xs font-bold uppercase text-slate-400 mb-1.5">Visi</h3>
              <p style={{ color: data.theme.primaryColor, backgroundColor: `${data.theme.primaryColor}08`, borderColor: `${data.theme.primaryColor}20` }} className="border p-3.5 rounded-xl text-xs font-semibold italic text-center">"{data.profil.visi}"</p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-xl">
            <h3 style={{ color: data.theme.primaryColor }} className="text-sm font-black uppercase tracking-wider mb-4">Misi Strategis</h3>
            <div className="space-y-3">
              {data.profil.misi.map((m, idx) => (
                <div key={idx} className="flex gap-3 p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
                  <span style={{ backgroundColor: data.theme.primaryColor }} className="h-5 w-5 text-slate-950 font-black rounded flex items-center justify-center text-[10px] shrink-0 mt-0.5">{idx+1}</span>
                  <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM STUDI */}
      <section id="program" className="py-16 bg-slate-950 border-y border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-xl font-black text-white mb-8">Program Studi Unggulan</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {data.programs.map(p => (
              <div key={p.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-all">
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">{p.name}</h4>
                  <p className="text-slate-400 text-xs font-normal">{p.desc}</p>
                </div>
                <a href="#ppdb" style={{ color: data.theme.primaryColor }} className="text-xs font-bold mt-5 block pt-2 border-t border-slate-800/60">Daftar Sekarang →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JADWAL */}
      <section id="jadwal" className="py-16 max-w-4xl mx-auto px-4 scroll-mt-20">
        <div className="text-center mb-8"><h2 className="text-xl font-black text-white">Jadwal Agenda Harian</h2></div>
        <div className="bg-slate-950 border border-slate-800 rounded-2xl divide-y divide-slate-850 shadow-xl overflow-hidden">
          {data.jadwal.map(j => (
            <div key={j.id} className="flex flex-col sm:flex-row p-4 gap-2 sm:gap-6 items-start sm:items-center">
              <span style={{ backgroundColor: data.theme.primaryColor }} className="inline-block px-2.5 py-0.5 text-slate-950 rounded text-[10px] font-mono font-black shrink-0">{j.waktu}</span>
              <p className="text-slate-300 text-xs font-medium">{j.kegiatan}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PPDB FORM */}
      <section id="ppdb" className="py-16 bg-slate-900 border-t border-slate-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <span style={{ backgroundColor: data.theme.primaryColor }} className="px-2 py-0.5 text-slate-950 rounded text-[10px] font-black uppercase mb-2 inline-block">PPDB {data.ppdb.status}</span>
            <h2 className="text-xl font-black text-white mb-3">Penerimaan Santri Baru</h2>
            <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl mb-4">
              <span className="text-[10px] text-slate-500 block">Gelombang Aktif:</span>
              <span className="text-xs font-bold text-white block mb-1">{data.ppdb.gelombang}</span>
              <span style={{ color: data.theme.primaryColor }} className="text-xs font-black block">Biaya Adm: {data.ppdb.biayaPendaftaran}</span>
            </div>
            <h4 className="text-xs font-bold text-slate-300 mb-2">Syarat Berkas:</h4>
            <ul className="space-y-1 text-xs text-slate-400">
              {data.ppdb.syarat.map((s, i) => <li key={i}>✓ {s}</li>)}
            </ul>
          </div>

          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-5 rounded-2xl shadow-xl">
            {ppdbSuccess ? (
              <div style={{ borderColor: data.theme.primaryColor }} className="text-center p-8 bg-slate-900 border rounded-xl">
                <h4 style={{ color: data.theme.primaryColor }} className="text-sm font-bold mb-1">Formulir Terkirim Berhasil!</h4>
                <p className="text-xs text-slate-400">Data pendaftaran atas nama <strong>{ppdbForm.nama}</strong> sudah disimulasikan.</p>
              </div>
            ) : (
              <form onSubmit={handlePpdbSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Nama Lengkap *</label>
                  <input type="text" required value={ppdbForm.nama} onChange={e => setPpdbForm({...ppdbForm, nama: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none" placeholder="Nama pendaftar..." />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Asal Sekolah</label>
                    <input type="text" value={ppdbForm.asalSekolah} onChange={e => setPpdbForm({...ppdbForm, asalSekolah: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none" placeholder="Asal instansi..." />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">No Kontak WhatsApp *</label>
                    <input type="tel" required value={ppdbForm.noHp} onChange={e => setPpdbForm({...ppdbForm, noHp: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none" placeholder="08xxx" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Program Studi Pilihan</label>
                  <select value={ppdbForm.programPilihan} onChange={e => setPpdbForm({...ppdbForm, programPilihan: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none">
                    {data.programs.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" style={{ backgroundColor: data.theme.primaryColor }} className="w-full text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider">Kirim Formulir</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* KONTAK */}
      <section id="kontak" className="py-10 max-w-7xl mx-auto px-4 border-t border-slate-800">
        <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-400 text-center sm:text-left">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl shadow-md">
            <strong style={{ color: data.theme.primaryColor }} className="block mb-1 text-xs uppercase">Alamat Kantor</strong>
            {data.kontak.alamat}
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl shadow-md">
            <strong style={{ color: data.theme.primaryColor }} className="block mb-1 text-xs uppercase">Hubungi Kami</strong>
            {data.kontak.telepon}
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl shadow-md">
            <strong style={{ color: data.theme.primaryColor }} className="block mb-1 text-xs uppercase">Email Resmi</strong>
            {data.kontak.email}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 py-5 text-center text-[11px] text-slate-600 border-t border-slate-900">
        <p>© 2026 Ribath At-Taqwa. All Rights Reserved.</p>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a href={targetWhatsappUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-40 bg-emerald-500 text-slate-950 p-3 rounded-full shadow-2xl flex items-center justify-center group transition-all transform hover:scale-110">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.06 .953 11.43 .951 6.002.951 1.575 5.321 1.572 10.751c-.001 1.674.452 3.307 1.311 4.7l-.984 3.595 3.699-.971c1.423.774 2.893 1.18 4.459 1.18zM17.91 14.1c-.333-.167-1.972-.974-2.278-1.086-.306-.112-.529-.167-.751.167-.222.334-.862 1.086-1.057 1.308-.195.223-.39.247-.723.08-1.041-.521-1.742-.966-2.433-2.152-.18-.31-.18-.579-.015-.745.149-.148.334-.39.5-.584.166-.195.222-.334.333-.556.111-.222.056-.417-.028-.584-.084-.167-.751-1.809-1.03-2.478-.27-.652-.546-.563-.751-.573-.195-.008-.417-.01-.639-.01-.222 0-.584.083-.89.417-.305.334-1.167 1.141-1.167 2.784 0 1.643 1.197 3.227 1.363 3.45.167.223 2.355 3.597 5.705 5.048.797.345 1.419.551 1.905.706.8.254 1.53.218 2.106.132.642-.096 1.972-.807 2.25-1.586.279-.779.279-1.447.195-1.586-.083-.139-.305-.222-.639-.389z"/></svg>
      </a>

      {/* PANEL MODAL ADMIN FULL CUSTOMIZATION */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-3">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl h-[85vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl">
            
            {/* Header Admin */}
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {editTheme.logoUrl ? (
                  <img src={editTheme.logoUrl} alt="Preview" className="h-10 w-10 object-cover rounded-lg border border-slate-700 bg-slate-900" />
                ) : (
                  <div style={{ backgroundColor: editTheme.primaryColor }} className="p-2 rounded-lg text-slate-950 font-bold text-xs">A</div>
                )}
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">🛠️ Pusat Kendali Kustomisasi Website</h3>
                  <p className="text-[10px] text-slate-400">Atur semua teks, menu navigasi, program, berkas syarat, dan data lapangan.</p>
                </div>
              </div>
              <button onClick={() => setIsAdminOpen(false)} className="px-3 py-1 bg-red-950/50 border border-red-900 text-red-400 rounded-lg text-[11px] font-bold">Tutup (X)</button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* MENU PILIHAN KIRI */}
              <div className="w-1/3 bg-slate-950/60 border-r border-slate-800 p-2 space-y-1 overflow-y-auto">
                <button onClick={() => setActiveAdminTab('logo-tampilan')} className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-semibold ${activeAdminTab === 'logo-tampilan' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-900'}`}>🖼️ Logo & Tampilan</button>
                <button onClick={() => setActiveAdminTab('navigation')} className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-semibold ${activeAdminTab === 'navigation' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-900'}`}>🧭 Teks Menu Navigasi</button>
                <button onClick={() => setActiveAdminTab('hero')} className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-semibold ${activeAdminTab === 'hero' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-900'}`}>📝 Judul Headline</button>
                <button onClick={() => setActiveAdminTab('stats')} className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-semibold ${activeAdminTab === 'stats' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-900'}`}>📊 Angka Statistik</button>
                <button onClick={() => setActiveAdminTab('profil')} className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-semibold ${activeAdminTab === 'profil' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-900'}`}>🕌 Sejarah & Misi</button>
                <button onClick={() => setActiveAdminTab('programs')} className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-semibold ${activeAdminTab === 'programs' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-900'}`}>🎓 Program Studi</button>
                <button onClick={() => setActiveAdminTab('jadwal')} className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-semibold ${activeAdminTab === 'jadwal' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-900'}`}>📅 Agenda Kegiatan</button>
                <button onClick={() => setActiveAdminTab('ppdb')} className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-semibold ${activeAdminTab === 'ppdb' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-900'}`}>📝 Parameter PPDB</button>
                <button onClick={() => setActiveAdminTab('kontak')} className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-semibold ${activeAdminTab === 'kontak' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:bg-slate-900'}`}>📞 Kontak & Alamat</button>
              </div>

              {/* ISIAN SEBELAH KANAN */}
              <div className="w-2/3 p-4 overflow-y-auto space-y-4">
                
                {/* A. LOGO & TAMPILAN */}
                {activeAdminTab === 'logo-tampilan' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase">Logo & Estetika Visual</h4>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                      <label className="block text-[11px] text-slate-300 font-bold uppercase">Upload File Logo Baru</label>
                      <input type="file" accept="image/*" onChange={(e) => handleLogoOrProfileUpload(e, 'logoUrl')} className="w-full bg-slate-900 p-2 rounded text-xs text-slate-300 border border-slate-800" />
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                      <label className="block text-[11px] text-slate-300 font-bold uppercase">Upload Foto Sampul Profil</label>
                      <input type="file" accept="image/*" onChange={(e) => handleLogoOrProfileUpload(e, 'fotoProfilUrl')} className="w-full bg-slate-900 p-2 rounded text-xs text-slate-300 border border-slate-800" />
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                      <label className="block text-[11px] text-slate-300 font-bold">Kegelapan Banner Atas: <span className="text-emerald-400">{editTheme.bannerDarkness}%</span></label>
                      <input type="range" min="15" max="85" value={editTheme.bannerDarkness} onChange={e => setEditTheme({ ...editTheme, bannerDarkness: parseInt(e.target.value) })} className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer" />
                    </div>
                  </div>
                )}

                {/* B. MENU NAVIGASI */}
                {activeAdminTab === 'navigation' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase">Ubah Judul Menu Navigasi</h4>
                    {editNavigation.map((nav, idx) => (
                      <div key={nav.id} className="flex items-center gap-3 bg-slate-950 p-2 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-500 font-mono w-14">ID: {nav.id}</span>
                        <input type="text" value={nav.label} onChange={e => { const c = [...editNavigation]; c[idx].label = e.target.value; setEditNavigation(c); }} className="w-full bg-slate-900 p-2 rounded text-xs text-white border border-slate-800" />
                      </div>
                    ))}
                  </div>
                )}

                {/* C. HERO HEADLINE */}
                {activeAdminTab === 'hero' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase">Headline Banner Utama</h4>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Judul Besar</label>
                      <textarea rows={2} value={editHero.title} onChange={e => setEditHero({...editHero, title: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2 text-xs text-white rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Deskripsi Subtitle</label>
                      <textarea rows={3} value={editHero.subtitle} onChange={e => setEditHero({...editHero, subtitle: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2 text-xs text-white rounded-lg" />
                    </div>
                  </div>
                )}

                {/* D. ANGKA STATISTIK */}
                {activeAdminTab === 'stats' && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase">Ubah Parameter Statistik Halaman</h4>
                    {editStats.map((st, idx) => (
                      <div key={st.id} className="bg-slate-950 p-2 rounded-xl border border-slate-800 grid grid-cols-2 gap-2">
                        <input type="text" value={st.label} onChange={e => { const c = [...editStats]; c[idx].label = e.target.value; setEditStats(c); }} className="bg-slate-900 border border-slate-800 p-2 text-xs text-white rounded" />
                        <input type="text" value={st.value} onChange={e => { const c = [...editStats]; c[idx].value = e.target.value; setEditStats(c); }} className="bg-slate-900 border border-slate-800 p-2 text-xs text-emerald-400 font-bold rounded" />
                      </div>
                    ))}
                  </div>
                )}

                {/* E. SEJARAH & MISI */}
                {activeAdminTab === 'profil' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase">Narasi Sejarah, Visi & List Misi</h4>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Deskripsi Sejarah Singkat</label>
                      <textarea rows={3} value={editProfil.sejarah} onChange={e => setEditProfil({...editProfil, sejarah: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2 text-xs text-white rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Visi Utama</label>
                      <input type="text" value={editProfil.visi} onChange={e => setEditProfil({...editProfil, visi: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2 text-xs text-white rounded-lg" />
                    </div>
                    <div className="border-t border-slate-800 pt-2">
                      <label className="block text-[10px] text-slate-400 mb-1">Daftar Misi Strategis saat ini:</label>
                      <div className="space-y-2">
                        {editProfil.misi.map((m, i) => (
                          <div key={i} className="flex gap-2 items-center">
                            <input type="text" value={m} onChange={e => { const copy = [...editProfil.misi]; copy[i] = e.target.value; setEditProfil({...editProfil, misi: copy}); }} className="w-full bg-slate-950 border border-slate-800 p-1.5 text-xs text-slate-300 rounded" />
                            <button type="button" onClick={() => setEditProfil({...editProfil, misi: editProfil.misi.filter((_, idx) => idx !== i)})} className="text-red-400 text-xs px-2 py-1 bg-red-950/30 border border-red-900 rounded">Hapus</button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <input type="text" placeholder="Tambah misi baru..." value={newMisiText} onChange={e => setNewMisiText(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-1.5 text-xs text-white rounded" />
                        <button type="button" onClick={() => { if(newMisiText.trim()) { setEditProfil({...editProfil, misi: [...editProfil.misi, newMisiText.trim()]}); setNewMisiText(""); } }} className="bg-emerald-600 text-slate-950 text-xs px-3 font-bold rounded">Tambah</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* F. PROGRAM STUDI */}
                {activeAdminTab === 'programs' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase">Kelola Parameter Program Studi</h4>
                    {editPrograms.map((prog, idx) => (
                      <div key={prog.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                        <input type="text" value={prog.name} onChange={e => { const c = [...editPrograms]; c[idx].name = e.target.value; setEditPrograms(c); }} className="w-full bg-slate-900 p-2 text-xs text-white border border-slate-800 font-bold rounded" placeholder="Nama Program" />
                        <textarea rows={2} value={prog.desc} onChange={e => { const c = [...editPrograms]; c[idx].desc = e.target.value; setEditPrograms(c); }} className="w-full bg-slate-900 p-2 text-xs text-slate-300 border border-slate-800 rounded" placeholder="Deskripsi ringkas program..." />
                      </div>
                    ))}
                  </div>
                )}

                {/* G. AGENDA JADWAL HARIAN */}
                {activeAdminTab === 'jadwal' && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase">Ubah Waktu & Rincian Agenda</h4>
                    {editJadwal.map((jad, idx) => (
                      <div key={jad.id} className="bg-slate-950 p-2 rounded-xl border border-slate-800 grid grid-cols-3 gap-2">
                        <input type="text" value={jad.waktu} onChange={e => { const c = [...editJadwal]; c[idx].waktu = e.target.value; setEditJadwal(c); }} className="bg-slate-900 p-1.5 text-xs text-emerald-400 font-mono rounded border border-slate-800" placeholder="Waktu" />
                        <input type="text" value={jad.kegiatan} onChange={e => { const c = [...editJadwal]; c[idx].kegiatan = e.target.value; setEditJadwal(c); }} className="col-span-2 bg-slate-900 p-1.5 text-xs text-white rounded border border-slate-800" placeholder="Nama kegiatan harian..." />
                      </div>
                    ))}
                  </div>
                )}

                {/* H. PARAMETER PPDB */}
                {activeAdminTab === 'ppdb' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase">Konfigurasi Jalur PPDB Berkas</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">Status Pendaftaran</label>
                        <select value={editPpdb.status} onChange={e => setEditPpdb({...editPpdb, status: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2 text-xs text-white rounded-lg">
                          <option value="Buka">BUKA</option>
                          <option value="Tutup">TUTUP</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">Biaya Pendaftaran</label>
                        <input type="text" value={editPpdb.biayaPendaftaran} onChange={e => setEditPpdb({...editPpdb, biayaPendaftaran: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2 text-xs text-white rounded-lg" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Keterangan Gelombang</label>
                      <input type="text" value={editPpdb.gelombang} onChange={e => setEditPpdb({...editPpdb, gelombang: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2 text-xs text-white rounded-lg" />
                    </div>
                    <div className="border-t border-slate-800 pt-2">
                      <label className="block text-[10px] text-slate-400 mb-1">List Dokumen Berkas Syarat:</label>
                      <div className="space-y-1.5">
                        {editPpdb.syarat.map((s, i) => (
                          <div key={i} className="flex gap-2 items-center">
                            <input type="text" value={s} onChange={e => { const copy = [...editPpdb.syarat]; copy[i] = e.target.value; setEditPpdb({...editPpdb, syarat: copy}); }} className="w-full bg-slate-950 border border-slate-800 p-1.5 text-xs text-slate-300 rounded" />
                            <button type="button" onClick={() => setEditPpdb({...editPpdb, syarat: editPpdb.syarat.filter((_, idx) => idx !== i)})} className="text-red-400 text-[11px] px-2 py-1 bg-red-950/30 border border-red-900 rounded">Hapus</button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <input type="text" placeholder="Tambah syarat berkas baru..." value={newSyaratText} onChange={e => setNewSyaratText(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-1.5 text-xs text-white rounded" />
                        <button type="button" onClick={() => { if(newSyaratText.trim()) { setEditPpdb({...editPpdb, syarat: [...editPpdb.syarat, newSyaratText.trim()]}); setNewSyaratText(""); } }} className="bg-emerald-600 text-slate-950 text-xs px-3 font-bold rounded">Tambah</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* I. KONTAK & ALAMAT */}
                {activeAdminTab === 'kontak' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase">Informasi Narasi Hubung Instansi</h4>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Alamat Lengkap Kantor</label>
                      <textarea rows={2} value={editKontak.alamat} onChange={e => setEditKontak({...editKontak, alamat: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2 text-xs text-white rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Nomor Telepon / Sekretariat</label>
                      <input type="text" value={editKontak.telepon} onChange={e => setEditKontak({...editKontak, telepon: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2 text-xs text-white rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-0.5">Email Resmi</label>
                      <input type="email" value={editKontak.email} onChange={e => setEditKontak({...editKontak, email: e.target.value})} className="w-full bg-slate-950 border border-slate-800 p-2 text-xs text-white rounded-lg" />
                    </div>
                    <div className="border-t border-slate-800 pt-2 space-y-2">
                      <label className="block text-[10px] text-emerald-400 font-bold uppercase">Integrasi Tombol WhatsApp Floating</label>
                      <input type="text" placeholder="628xxx" value={editTheme.whatsappNumber} onChange={e => setEditTheme({ ...editTheme, whatsappNumber: e.target.value })} className="w-full bg-slate-950 border border-slate-800 p-2 text-xs text-white rounded-lg font-mono" />
                      <textarea rows={2} placeholder="Isi pesan pembuka otomatis..." value={editTheme.whatsappMessage} onChange={e => setEditTheme({ ...editTheme, whatsappMessage: e.target.value })} className="w-full bg-slate-950 border border-slate-800 p-2 text-xs text-white rounded-lg" />
                    </div>
                  </div>
                )}

                {/* TOMBOL SIMPAN UTAMA */}
                <div className="pt-3 border-t border-slate-800">
                  <button onClick={saveAllChanges} className="w-full bg-emerald-500 text-slate-950 font-black px-4 py-3 rounded-xl text-xs tracking-wider uppercase shadow-xl hover:brightness-110 transition-all">
                    💾 Terapkan Logo & Seluruh Pembaruan Komponen Menu
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
