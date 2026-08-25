import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, PRODUCTS_TABLE, ORDERS_TABLE, LIBRARY_TABLE, WALLET_TABLE } from "./lib/supabase";
import type { Product } from "./lib/supabase";

// ---------- Header ----------
function Header({ user, credits }: { user: any; credits: number }) {
  const [open, setOpen] = useState(false);
  const nav = [
    { label: "Ebooks", to: "/shop" },
    { label: "Experts", to: "/experts" },
    { label: "Blog", to: "/blog" },
    { label: "My library", to: "/library" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-rose-600">
          <span className="flex size-8 items-center justify-center rounded-lg bg-rose-600 text-white">R</span>
          Romance Unplugged
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="hover:text-rose-600">
              {n.label}
            </Link>
          ))}
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
            <Link to="/login" className="btn btn-primary !px-4 !py-2 text-xs">Sign in</Link>
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
            <span className="text-gray-400">Free Downloads — SOON</span>
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
function Home({ products }: { products: Product[] }) {
  return (
    <div>
      <section className="border-b border-gray-200 bg-gradient-to-b from-rose-50 to-white">
        <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2">
          <div>
            <div className="mb-4 inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
              Expert relationship education
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Deeper connections, <span className="text-rose-600">one guide at a time.</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Ebooks, coaches and stories built for real couples. Learn, practice and grow together.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/shop" className="btn btn-primary">Browse ebooks</Link>
              <Link to="/product/all-access-pass" className="btn btn-outline">All Access Pass</Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {products.slice(0, 4).map((p) => (
              <Link key={p.id} to={`/product/${p.slug}`} className="card group transition hover:shadow-lg">
                <div className="flex aspect-[3/4] items-center justify-center rounded-lg bg-gradient-to-br from-rose-100 to-rose-50 text-4xl">
                  📖
                </div>
                <div className="mt-3 text-sm font-semibold group-hover:text-rose-600">{p.title}</div>
                <div className="mt-1 text-sm text-gray-500">₹{p.price}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="container-page py-14">
        <h2 className="text-2xl font-bold">Featured ebooks</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <Link key={p.id} to={`/product/${p.slug}`} className="card group transition hover:shadow-lg">
              <div className="flex aspect-[3/4] items-center justify-center rounded-lg bg-gradient-to-br from-rose-100 to-rose-50 text-4xl">📖</div>
              <div className="mt-3 text-sm font-semibold group-hover:text-rose-600">{p.title}</div>
              <div className="mt-1 text-xs text-gray-500">{p.subtitle}</div>
              <div className="mt-2 text-sm font-bold text-rose-600">₹{p.price}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

// ---------- Shop ----------
function Shop({ products }: { products: Product[] }) {
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold">All ebooks</h1>
      <p className="mt-2 text-gray-500">Expert guides for deeper connection and intimacy.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <Link key={p.id} to={`/product/${p.slug}`} className="card group transition hover:shadow-lg">
            <div className="flex aspect-[3/4] items-center justify-center rounded-lg bg-gradient-to-br from-rose-100 to-rose-50 text-4xl">📖</div>
            <div className="mt-3 text-sm font-semibold group-hover:text-rose-600">{p.title}</div>
            <div className="mt-2 text-sm font-bold text-rose-600">₹{p.price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ---------- Product ----------
function Product({ products }: { products: Product[] }) {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const [user] = useAuth();
  const [owned, setOwned] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && product) {
      supabase.from(LIBRARY_TABLE).select("id").eq("user_id", user.id).eq("product_id", product.id).maybeSingle().then(({ data }) => setOwned(!!data));
    }
  }, [user, product]);

  if (!product) return <div className="container-page py-20 text-center">Product not found</div>;

  async function buy() {
    if (!user) { navigate("/login"); return; }
    // simulate the payment (UPI/COD flow would go here)
    const { error } = await supabase.from(ORDERS_TABLE).insert({
      user_id: user.id,
      product_id: product.id,
      amount: product.price,
      status: "paid",
    });
    if (!error) {
      await supabase.from(LIBRARY_TABLE).insert({ user_id: user.id, product_id: product.id });
      setOwned(true);
      alert("Purchase complete! Check your library.");
    }
  }

  return (
    <div className="container-page grid gap-10 py-12 md:grid-cols-2">
      <div>
        <div className="flex aspect-[3/4] items-center justify-center rounded-2xl bg-gradient-to-br from-rose-100 to-rose-50 text-6xl">📖</div>
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-rose-600">{product.type}</div>
        <h1 className="mt-2 text-3xl font-bold">{product.title}</h1>
        <p className="mt-2 text-gray-600">{product.subtitle}</p>
        <div className="mt-4 text-2xl font-bold">₹{product.price}</div>
        <p className="mt-4 leading-relaxed text-gray-600">{product.description}</p>
        {owned ? (
          <Link to="/library" className="btn btn-primary mt-6">Read in library</Link>
        ) : (
          <button onClick={buy} className="btn btn-primary mt-6 w-full md:w-auto">Buy now</button>
        )}
      </div>
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
    else {
      setMsg(mode === "magic" ? "Magic link sent! Check your email." : "Welcome back!");
      setTimeout(() => navigate("/"), 1200);
    }
  }

  async function signUp() {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setMsg(error.message);
    else {
      setMsg("Account created! Check your email to confirm, then sign in.");
    }
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
            No account?{" "}
            <button onClick={signUp} className="font-semibold text-rose-600">Sign up</button>
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
            <div className="mt-3 font-semibold">{it.products?.title}</div>
            <button className="btn btn-primary mt-3 w-full !py-2 text-xs" onClick={() => alert("Content delivery: " + it.products?.title)}>Open</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Wallet ----------
function Wallet({ user, credits }: { user: any; credits: number }) {
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
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ title: "", subtitle: "", description: "", price: 299, slug: "", type: "ebook" });
  const [msg, setMsg] = useState("");

  useEffect(() => { if (user) load(); }, [user]);
  async function load() {
    const { data } = await supabase.from(PRODUCTS_TABLE).select("*").order("created_at", { ascending: false });
    setProducts(data || []);
  }
  async function save() {
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const { error } = await supabase.from(PRODUCTS_TABLE).insert({
      ...form, slug, currency: "INR", status: "active", cover_url: "", content: "",
    });
    setMsg(error ? "Error: " + error.message : "Product added!");
    if (!error) { setForm({ title: "", subtitle: "", description: "", price: 299, slug: "", type: "ebook" }); load(); }
  }
  async function remove(id: string) {
    await supabase.from(PRODUCTS_TABLE).delete().eq("id", id);
    load();
  }

  if (!user) return <div className="container-page py-20 text-center"><Link to="/login" className="text-rose-600">Sign in to access the admin panel</Link></div>;

  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold">Admin panel</h1>
      <p className="mt-1 text-sm text-gray-500">Manage products and deliver courses.</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-bold">Add product</h2>
          <div className="mt-4 grid gap-3">
            <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="input" placeholder="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
            <textarea className="input" placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <input className="input" type="number" placeholder="Price ₹" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
              <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="ebook">Ebook</option>
                <option value="course">Course</option>
                <option value="pass">All Access Pass</option>
                <option value="consultation">Consultation</option>
              </select>
            </div>
            <button onClick={save} className="btn btn-primary">Save product</button>
            {msg && <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{msg}</div>}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold">Products ({products.length})</h2>
          <div className="mt-4 flex flex-col gap-3">
            {products.map((p) => (
              <div key={p.id} className="card flex items-center justify-between">
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-xs text-gray-500">₹{p.price} · {p.type} · {p.status}</div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/product/${p.slug}`} className="text-sm text-rose-600">View</Link>
                  <button onClick={() => remove(p.id)} className="text-sm text-gray-400 hover:text-rose-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Auth hook ----------
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
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    supabase.from(PRODUCTS_TABLE).select("*").eq("status", "active").order("created_at", { ascending: false }).then(({ data }) => setProducts(data || []));
  }, []);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Header user={user} credits={credits} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home products={products} />} />
            <Route path="/shop" element={<Shop products={products} />} />
            <Route path="/product/:slug" element={<Product products={products} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/library" element={<Library user={user} />} />
            <Route path="/wallet" element={<Wallet user={user} credits={credits} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/experts" element={<div className="container-page py-20 text-center text-gray-500">Experts directory coming soon.</div>} />
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
