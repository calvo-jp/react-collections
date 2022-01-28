import avatar from 'assets/images/avatar.jpg';
import Avatar from 'layouts/Avatar';
import HeaderTwo from 'layouts/HeaderTwo';
import Head from 'next/head';

const User = () => {
  return (
    <div>
      <Head>
        <title>JP Calvo</title>
      </Head>

      <HeaderTwo url="/" />

      <main className="p-16 max-w-3xl mx-auto">
        <div>
          <Avatar src={avatar} />
        </div>
      </main>
    </div>
  );
};

export default User;
