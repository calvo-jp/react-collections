import avatar from "assets/samples/images/avatar.jpg";
import Avatar from "layouts/Avatar";
import HeaderTwo from "layouts/HeaderTwo";
import Head from "next/head";

const User = () => {
  return (
    <div>
      <Head>
        <title>JP Calvo</title>
      </Head>

      <HeaderTwo />

      <main className="mx-auto max-w-3xl p-16">
        <div>
          <Avatar src={avatar} />
        </div>
      </main>
    </div>
  );
};

export default User;
