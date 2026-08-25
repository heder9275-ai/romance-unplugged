import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, PRODUCTS_TABLE, ORDERS_TABLE, LIBRARY_TABLE } from "./lib/supabase";
import type { Product } from "./lib/supabase";
import { PRODUCTS } from "./lib/products-data";

// ---------- Header ----------
function Header({ user, credits }: { user: any; credits: number }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-rose-600">
          <span className="flex size-8 items-center justify-center rounded-lg bg-rose-600 text-white">R</span>
          Romance Unplugged
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          <Link to="/shop" className="hover:text-rose-600">All ebooks</Link>
          <Link to="/blog" className="hover:text-rose-600">Blog</Link>
          <Link to="/library" className="hover:text-rose-600">My library</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/wallet" className="hidden rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 sm:block">
            ⭐ {credits} credits
          </Link>
          {user ? (
            <div className="relative">
              <button onClick={() => setOpen(!open)} className="flex size-9 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700">
                {(user.email || "U")[0].toUpperCase()}
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                  <div className="px-3 py-2 text-xs text-gray-500">{user.email}</div>
                  <Link to="/admin" className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-50">Admin panel</Link>
                  <button onClick={async () => { await supabase.auth.signOut(); window.location.reload(); }} className="block w-full rounded-lg px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary !px-4 !py-2 text-xs">Log in</Link>
          )}
        </div>
      </div>
    </header>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container-page grid gap-8 py-12 md:grid-cols-4">
        <div>
          <div className="text-lg font-bold text-rose-600">Romance Unplugged</div>
          <p className="mt-2 text-sm text-gray-500">Expert relationship education. Building deeper connections, one guide at a time.</p>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">PRODUCTS</div>
          <div className="flex flex-col gap-2 text-sm text-gray-500">
            <Link to="/shop">All Ebooks</Link>
            <Link to="/product/all-access-pass">All Access Pass</Link>
            <span className="text-gray-400">Courses — SOON</span>
          </div>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">RESOURCES</div>
          <div className="flex flex-col gap-2 text-sm text-gray-500">
            <Link to="/blog">Blog</Link>
            <span className="text-gray-400">Couple Games — SOON</span>
          </div>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">SUPPORT</div>
          <div className="flex flex-col gap-2 text-sm text-gray-500">
            <Link to="/contact">Contact Us</Link>
            <Link to="/about">About Us</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/refund">Refunds</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 py-4">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
          <span>100% Private & Secure · Discreet Billing · SSL Encrypted</span>
          <span>WE ACCEPT: VISA · UPI · RUPAY · MASTERCARD · AMEX</span>
          <span>© 2026 Romance Unplugged. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

// ---------- Home ----------
function Home() {
  return (
    <div>
      <section className="border-b border-gray-200 bg-gradient-to-b from-rose-50 to-white">
        <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2">
          <div>
            <div className="mb-4 inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
              Expert relationship education
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Your shelf, <span className="text-rose-600">spicier.</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Expert ebooks, coaches and stories for Indian couples. Instant PDF delivery.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/shop" className="btn btn-primary">Browse ebooks</Link>
              <Link to="/product/all-access-pass" className="btn btn-outline">All Access Pass</Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {PRODUCTS.slice(0, 4).map((p) => (
              <Link key={p.slug} to={`/product/${p.slug}`} className="card group transition hover:shadow-lg">
                <img src={p.cover} alt={p.title} className="aspect-[3/4] w-full rounded-lg object-cover" />
                <div className="mt-3 text-sm font-semibold group-hover:text-rose-600">{p.title}</div>
                <div className="mt-1 text-sm text-gray-500">₹{p.price} <span className="text-xs text-gray-400 line-through">₹{p.original}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="container-page py-14">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">All ebooks</h2>
          <span className="text-xs text-gray-400">16 of 16 · Hindi + English · Instant PDF delivery</span>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <Link key={p.slug} to={`/product/${p.slug}`} className="card group transition hover:shadow-lg">
              <img src={p.cover} alt={p.title} className="aspect-[3/4] w-full rounded-lg object-cover" />
              <div className="mt-3 text-sm font-semibold group-hover:text-rose-600">{p.title}</div>
              <div className="mt-1 text-xs text-gray-500">{p.tagline}</div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-amber-500">{p.rating}★</span>
                <span className="text-sm font-bold text-rose-600">₹{p.price}</span>
                <span className="text-xs text-gray-400 line-through">₹{p.original}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

// ---------- Shop ----------
function Shop() {
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold">Your shelf, spicier.</h1>
      <p className="mt-2 text-sm text-gray-500">All ebooks · 16 of 16 · Hindi + English · Instant PDF delivery</p>
      <div className="mt-6 flex flex-wrap gap-2 text-xs">
        {["All", "Positions", "First Time", "Wellness", "Ideas", "Mindset", "Communication", "Technique", "Partner"].map((c) => (
          <span key={c} className="rounded-full border border-gray-200 px-3 py-1 text-gray-600">{c}</span>
        ))}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((p) => (
          <Link key={p.slug} to={`/product/${p.slug}`} className="card group transition hover:shadow-lg">
            <img src={p.cover} alt={p.title} className="aspect-[3/4] w-full rounded-lg object-cover" />
            <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-rose-500">{p.category}</div>
            <div className="mt-1 text-sm font-semibold group-hover:text-rose-600">{p.title}</div>
            <div className="mt-1 text-xs text-gray-500">{p.tagline}</div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-amber-500">{p.rating}★</span>
              <span className="text-sm font-bold text-rose-600">₹{p.price}</span>
              <span className="text-xs text-gray-400 line-through">₹{p.original}</span>
              <span className="ml-auto rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">SAVE ₹{p.original - p.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ---------- Product (exact sales-page layout!) ----------
function ProductPage() {
  const { slug } = useParams();
  const p = PRODUCTS.find((x) => x.slug === slug);
  const [user] = useAuth();
  const [owned, setOwned] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && p) {
      supabase.from(LIBRARY_TABLE).select("id").eq("user_id", user.id).eq("product_id", p.slug).maybeSingle().then(({ data }) => setOwned(!!data));
    }
  }, [user, p]);

  if (!p) return <div className="container-page py-20 text-center">Product not found</div>;

  async function buy() {
    if (!user) { navigate("/login"); return; }
    const { error } = await supabase.from(ORDERS_TABLE).insert({
      user_id: user.id,
      product_id: p.slug,
      amount: p.price,
      status: "paid",
    });
    if (!error) {
      await supabase.from(LIBRARY_TABLE).insert({ user_id: user.id, product_id: p.slug });
      setOwned(true);
      alert("Purchase complete! Check your library.");
    }
  }

  return (
    <div>
      {/* HERO */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-rose-50 to-white">
        <div className="container-page grid items-center gap-10 py-14 md:grid-cols-2">
          <div>
            <div className="mb-3 text-sm font-bold uppercase tracking-wide text-rose-600">{p.category}</div>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">{p.h1}</h1>
            <p className="mt-3 text-gray-600">{p.heroSub}</p>
            <div className="mt-5 grid gap-2 text-sm">
              {p.props.map((x) => <div key={x} className="flex items-center gap-2"><span className="text-lg">{x.split(" ")[0]}</span><span>{x.slice(x.indexOf(" ") + 1)}</span></div>)}
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-700">⭐⭐⭐⭐ {p.reviewLabel}</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">📄 {p.pagesLabel}</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">🇮🇳 Hindi / English</span>
              <span className="rounded-full bg-rose-100 px-3 py-1 font-semibold text-rose-700">🏆 {p.badge}</span>
            </div>
          </div>
          <div>
            <div className="card relative overflow-hidden">
              <div className="absolute right-3 top-3 rounded-full bg-green-600 px-2 py-1 text-[10px] font-bold text-white">{p.discount}% off</div>
              <img src={p.cover} alt={p.title} className="aspect-[3/4] w-full rounded-xl object-cover" />
              <div className="mt-4 flex items-end gap-2">
                <span className="text-3xl font-bold">₹{p.price}</span>
                <span className="pb-1 text-sm text-gray-400 line-through">₹{p.original}</span>
              </div>
              <button onClick={buy} className="btn btn-primary mt-3 w-full !py-3 text-base">
                {owned ? "✓ Purchased — Open in library" : `Unlock ${p.shortTitle} — ₹${p.price} 🔥`}
              </button>
              {owned ? (
                <Link to="/library" className="btn btn-outline mt-2 w-full !py-2 text-sm">Open in library</Link>
              ) : null}
              <div className="mt-3 text-center text-xs text-gray-500">Hindi &amp; English · Aaj raat se shuru 😈</div>
              <div className="mt-2 flex items-center justify-center gap-2 text-xs">
                <span className="text-amber-500">⭐⭐⭐⭐ {p.reviewLabel}</span>
                <span>· {p.couplesLabel}</span>
              </div>
              <div className="mt-3 rounded-lg bg-green-50 p-2 text-center text-[11px] font-semibold text-green-700">
                ✅ SAFE &amp; SECURE CHECKOUT — ALL PAYMENT METHODS ACCEPTED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="container-page py-12">
        <h2 className="text-center text-2xl font-bold">SACH BATAO</h2>
        <p className="mt-1 text-center text-gray-500">Bedroom mein yeh hota hai tumhare saath? 😬</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.pains.map((x) => (
            <div key={x} className="card text-center">
              <div className="text-2xl">😬</div>
              <p className="mt-2 text-sm text-gray-600">{x}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">{p.painNote}</p>
      </section>

      {/* STORY */}
      <section className="border-y border-gray-100 bg-white py-12">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl font-bold">MERI STORY</h2>
          <div className="mt-4 space-y-3 text-gray-600">
            <p>"{p.story}"</p>
            <p className="text-sm">— Dr. Myra, Founder — Romance Unplugged</p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="container-page py-12">
        <h2 className="text-2xl font-bold">{p.benefitTitle}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.benefits.map((b) => (
            <div key={b.title} className="card">
              <div className="text-2xl">{b.emoji}</div>
              <div className="mt-2 font-semibold">{b.title}</div>
              <p className="mt-1 text-sm text-gray-500">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-gray-100 bg-white py-12">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl font-bold">FAQ</h2>
          <div className="mt-6 space-y-4">
            {p.faqs.map((f) => (
              <details key={f.q} className="card">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-sm text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------- Login ----------
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function signIn() {
    const { error } =
      mode === "magic"
        ? await supabase.auth.signInWithOtp({ email })
        : await supabase.auth.signInWithPassword({ email, password });
    if (error) setMsg(error.message);
    else { setMsg("Welcome back!"); setTimeout(() => navigate("/"), 1200); }
  }
  async function signUp() {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setMsg(error.message);
    else setMsg("Account created! Check your email to confirm, then sign in.");
  }

  return (
    <div className="container-page flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="card">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-gray-500">Sign in with your password or a magic link.</p>
          <button
            onClick={async () => { const { error } = await supabase.auth.signInWithOAuth({ provider: "google" }); if (error) setMsg(error.message); }}
            className="btn btn-outline mt-5 w-full"
          >
            Continue with Google
          </button>
          <div className="my-4 flex items-center gap-3 text-xs text-gray-400">
            <span className="h-px flex-1 bg-gray-200" /> OR <span className="h-px flex-1 bg-gray-200" />
          </div>
          <input className="input" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          {mode === "password" && (
            <input className="input mt-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          )}
          <button onClick={signIn} className="btn btn-primary mt-4 w-full">Sign in</button>
          <button onClick={() => setMode(mode === "password" ? "magic" : "password")} className="mt-3 w-full text-center text-sm text-rose-600">
            {mode === "password" ? "Use a magic link instead" : "Use a password instead"}
          </button>
          <div className="mt-4 border-t border-gray-100 pt-4 text-center text-sm">
            No account? <button onClick={signUp} className="font-semibold text-rose-600">Sign up</button>
          </div>
          {msg && <div className="mt-3 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{msg}</div>}
        </div>
      </div>
    </div>
  );
}

// ---------- Library ----------
function Library({ user }: { user: any }) {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    if (!user) return;
    supabase.from(LIBRARY_TABLE).select("*, products(*)").eq("user_id", user.id).then(({ data }) => setItems(data || []));
  }, [user]);
  if (!user) return <div className="container-page py-20 text-center"><Link to="/login" className="text-rose-600">Sign in to view your library</Link></div>;
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold">My library</h1>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.length === 0 && <p className="text-gray-500">No items yet. <Link to="/shop" className="text-rose-600">Browse ebooks</Link></p>}
        {items.map((it) => (
          <div key={it.id} className="card">
            <div className="flex aspect-[16/9] items-center justify-center rounded-lg bg-gradient-to-br from-rose-100 to-rose-50 text-3xl">📖</div>
            <div className="mt-3 font-semibold">{it.products?.title || it.product_id}</div>
            <button className="btn btn-primary mt-3 w-full !py-2 text-xs" onClick={() => alert("Content delivery: " + (it.products?.title || it.product_id))}>Open</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Wallet ----------
function Wallet({ credits }: { credits: number }) {
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold">Wallet</h1>
      <div className="mt-6 max-w-sm">
        <div className="card text-center">
          <div className="text-4xl font-bold text-amber-600">⭐ {credits}</div>
          <div className="mt-1 text-sm text-gray-500">credits available</div>
          <button className="btn btn-primary mt-4 w-full">Get 50 free credits</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Admin ----------
function Admin() {
  const [user] = useAuth();
  const [form, setForm] = useState({ title: "", price: 299, type: "ebook" });
  const [msg, setMsg] = useState("");
  if (!user) return <div className="container-page py-20 text-center"><Link to="/login" className="text-rose-600">Sign in to access the admin panel</Link></div>;
  async function save() {
    const { error } = await supabase.from(PRODUCTS_TABLE).insert({
      slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"), title: form.title, price: form.price, type: form.type, status: "active",
    });
    setMsg(error ? "Error: " + error.message : "Product added!");
  }
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold">Admin panel</h1>
      <p className="mt-1 text-sm text-gray-500">Manage products and deliver courses.</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-bold">Add product</h2>
          <div className="mt-4 grid gap-3">
            <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <input className="input" type="number" placeholder="Price ₹" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
              <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="ebook">Ebook</option>
                <option value="course">Course</option>
                <option value="pass">Pass</option>
              </select>
            </div>
            <button onClick={save} className="btn btn-primary">Save product</button>
            {msg && <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{msg}</div>}
          </div>
        </div>
        <div className="card">
          <h2 className="text-lg font-bold">Static catalog ({PRODUCTS.length} ebooks)</h2>
          <p className="mt-2 text-sm text-gray-500">The 16 ebooks are bundled with the app — no database needed. Database products appear in the Admin once the SQL is run.</p>
        </div>
      </div>
    </div>
  );
}

// ---------- Auth ----------
function useAuth(): [any, number] {
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState(0);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
      if (data.session?.user) {
        supabase.from("profiles").select("credits").eq("id", data.session.user.id).maybeSingle().then(({ data: p }) => setCredits(p?.credits ?? 50));
      }
    });
    supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user || null));
  }, []);
  return [user, credits];
}

// ---------- App ----------
export default function App() {
  const [user, credits] = useAuth();
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Header user={user} credits={credits} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/library" element={<Library user={user} />} />
            <Route path="/wallet" element={<Wallet credits={credits} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/blog" element={<div className="container-page py-20 text-center text-gray-500">Blog coming soon.</div>} />
            <Route path="/about" element={<div className="container-page py-20 text-center text-gray-500">About us — coming soon.</div>} />
            <Route path="/contact" element={<div className="container-page py-20 text-center text-gray-500">Contact us — coming soon.</div>} />
            <Route path="/privacy" element={<div className="container-page py-20 text-center text-gray-500">Privacy policy — coming soon.</div>} />
            <Route path="/terms" element={<div className="container-page py-20 text-center text-gray-500">Terms — coming soon.</div>} />
            <Route path="/refund" element={<div className="container-page py-20 text-center text-gray-500">Refund policy — coming soon.</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
