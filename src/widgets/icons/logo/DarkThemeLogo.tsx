import clsx from 'clsx';
import * as React from 'react';

const DarkThemeLogoIcon = ({
  className,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="160"
      height="30"
      fill="none"
      viewBox="0 0 160 30"
      className={clsx(className, 'hidden dark:block')}
      {...props}
    >
      <path
        fill="#b1b1b7"
        d="M38.566 1.275h3.994v21.789h6.573v3.631H38.566V1.275zM56.681 27.058c-1.96 0-3.462-.556-4.503-1.67-1.04-1.114-1.561-2.687-1.561-4.721V7.303c0-2.034.52-3.607 1.561-4.721C53.22 1.468 54.72.912 56.681.912c1.961 0 3.462.556 4.503 1.67 1.041 1.114 1.562 2.687 1.562 4.721v13.364c0 2.034-.52 3.607-1.562 4.72-1.04 1.115-2.542 1.671-4.503 1.671zm0-3.631c1.38 0 2.07-.835 2.07-2.506V7.05c0-1.67-.69-2.506-2.07-2.506s-2.07.835-2.07 2.506V20.92c0 1.67.69 2.506 2.07 2.506zM71.112 27.058c-1.936 0-3.413-.544-4.43-1.634-1.017-1.113-1.525-2.7-1.525-4.757V7.303c0-2.058.508-3.632 1.525-4.721 1.017-1.114 2.494-1.67 4.43-1.67 1.937 0 3.414.556 4.43 1.67 1.018 1.09 1.526 2.663 1.526 4.721v2.179h-3.777V7.049c0-1.67-.69-2.506-2.07-2.506s-2.07.835-2.07 2.506v13.909c0 1.646.69 2.469 2.07 2.469s2.07-.823 2.07-2.47v-4.975h-1.997v-3.631h5.774v8.316c0 2.058-.508 3.644-1.525 4.757-1.017 1.09-2.494 1.634-4.43 1.634zM85.407 27.058c-1.961 0-3.462-.556-4.503-1.67-1.041-1.114-1.562-2.687-1.562-4.721V7.303c0-2.034.52-3.607 1.562-4.721 1.041-1.114 2.542-1.67 4.503-1.67 1.961 0 3.462.556 4.503 1.67 1.041 1.114 1.562 2.687 1.562 4.721v13.364c0 2.034-.52 3.607-1.562 4.72-1.04 1.115-2.542 1.671-4.503 1.671zm0-3.631c1.38 0 2.07-.835 2.07-2.506V7.05c0-1.67-.69-2.506-2.07-2.506s-2.07.835-2.07 2.506V20.92c0 1.67.69 2.506 2.07 2.506z"
        className="ccompli1"
        stopColor="#b1b1b7"
      ></path>
      <path
        fill="#d4d4d8"
        d="M94.18 1.275h3.995v25.42h-3.994V1.275zM101.167 1.275h5.883c1.985 0 3.474.532 4.467 1.598.993 1.065 1.489 2.626 1.489 4.684v2.506c0 2.058-.496 3.62-1.489 4.685-.993 1.065-2.482 1.597-4.467 1.597h-1.888v10.35h-3.995V1.275zm5.883 11.439c.654 0 1.138-.182 1.453-.545.339-.363.508-.98.508-1.852V7.303c0-.872-.169-1.489-.508-1.852-.315-.363-.799-.545-1.453-.545h-1.888v7.808h1.888zM120.51 27.058c-1.936 0-3.401-.544-4.394-1.634-.992-1.113-1.489-2.7-1.489-4.757v-1.453h3.777v1.744c0 1.646.69 2.469 2.07 2.469.678 0 1.186-.194 1.525-.581.363-.412.545-1.065.545-1.961 0-1.065-.242-1.998-.726-2.796-.484-.824-1.38-1.804-2.688-2.942-1.646-1.453-2.796-2.76-3.45-3.922-.653-1.186-.98-2.518-.98-3.995 0-2.01.508-3.559 1.525-4.648 1.017-1.114 2.494-1.67 4.431-1.67 1.912 0 3.353.556 4.321 1.67.993 1.09 1.489 2.663 1.489 4.721v1.053h-3.777V7.05c0-.872-.169-1.501-.508-1.889-.339-.411-.835-.617-1.489-.617-1.332 0-1.997.811-1.997 2.433 0 .92.242 1.78.726 2.579.508.798 1.416 1.767 2.724 2.905 1.67 1.452 2.82 2.772 3.45 3.958.629 1.186.944 2.578.944 4.176 0 2.082-.521 3.68-1.562 4.794-1.017 1.114-2.506 1.67-4.467 1.67zM134.64 27.058c-1.937 0-3.414-.544-4.431-1.634-1.017-1.113-1.525-2.7-1.525-4.757V1.275h3.995v19.683c0 .871.169 1.5.508 1.888.363.387.872.58 1.525.58.654 0 1.15-.193 1.489-.58.363-.387.545-1.017.545-1.889V1.276h3.849v19.392c0 2.058-.508 3.644-1.525 4.757-1.017 1.09-2.494 1.634-4.43 1.634zM143.44 1.275h5.702l2.542 18.193h.072l2.543-18.193H160v25.42h-3.777V7.448h-.072l-2.906 19.247h-3.341l-2.905-19.247h-.072v19.247h-3.487V1.275z"
        className="ccustom"
        stopColor="#d4d4d8"
      ></path>
      <path
        fill="#b1b1b7"
        d="M0 26.695A8.898 8.898 0 000 8.898v6.23a2.67 2.67 0 010 5.338v6.23z"
        className="ccompli1"
        stopColor="#b1b1b7"
      ></path>
      <path
        fill="#8e8e96"
        d="M29.661 11.865a15.935 15.935 0 00-4.82-.742c-8.805 0-15.943 7.138-15.943 15.943 0 .884.072 1.75.21 2.595h9.907a6.377 6.377 0 0110.647-6.771V11.865z"
        className="ccompli2"
        stopColor="#8e8e96"
      ></path>
      <path
        fill="#d4d4d8"
        d="M1.565 0C2.302 6.674 7.96 11.865 14.83 11.865c6.87 0 12.528-5.191 13.266-11.865H18.55a4.006 4.006 0 01-7.441 0H1.565z"
        className="ccustom"
        stopColor="#d4d4d8"
      ></path>
    </svg>
  );
};

export default DarkThemeLogoIcon;
