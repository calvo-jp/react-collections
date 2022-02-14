import IInstruction from 'types/instruction';

interface VideoPlayerProps extends React.ComponentProps<'video'> {
  data?: IInstruction;
  caption?: boolean;
}

const Wrapper: React.FC = ({ children }) => {
  return (
    <div className="h-[250px] md:h-[300px] lg:h-[325px] flex items-center justify-center bg-gray-100 dark:bg-zinc-800">
      {children}
    </div>
  );
};

const VideoPlayer = ({
  data,
  caption,
  className,
  ...props
}: VideoPlayerProps) => {
  if (!data) {
    return (
      <Wrapper>
        <p className="text-gray-500 dark:text-zinc-400">Select to play</p>
      </Wrapper>
    );
  }

  return (
    <div className={className}>
      <div>
        {!data.video && (
          <Wrapper>
            <p className="text-gray-500 dark:text-zinc-400">
              No video available
            </p>
          </Wrapper>
        )}

        {data.video && (
          <video src={data.video} className="w-full" controls {...props} />
        )}
      </div>

      {caption && (
        <div className="mt-2">
          <div>
            <div>{data.description}</div>
            <div className="text-sm text-gray-400 dark:text-zinc-500">
              3 mins ago
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
