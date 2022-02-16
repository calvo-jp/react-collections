import PencilAltIcon from '@heroicons/react/solid/PencilAltIcon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from 'widgets/Button';

const CreateButton = () => {
  const router = useRouter();

  return (
    <Link
      href={'/recipes/new?redirect=' + encodeURIComponent(router.asPath)}
      passHref
    >
      <a className="block">
        <Button
          variant="outlined"
          color="primary"
          label="Create New"
          icon={<PencilAltIcon className="w-5 h-5" />}
          fullWidth
        />
      </a>
    </Link>
  );
};

export default CreateButton;
