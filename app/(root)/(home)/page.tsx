import { UserButton, SignedIn } from "@clerk/nextjs";

function Home() {
  return (
    <div>
      <p>ini halaman home</p>
      <SignedIn>
        {/* 
          // * ini bawaan dari CLERK, akan muncul setelah user sign in 
          // * otomatis ambil gambar sebagai profile picture
        */}
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
}

export default Home;
