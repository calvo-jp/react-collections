import IInstruction from 'types/instruction';

interface VideoPlayerProps extends React.ComponentProps<'video'> {
  data?: IInstruction;
  caption?: boolean;
}

const Wrapper: React.FC = ({ children }) => {
  return (
    <div className="h-[250px] md:h-[300px] lg:h-[350px] flex items-center justify-center bg-gray-100">
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
        <p className="text-gray-500">Select to play</p>
      </Wrapper>
    );
  }

  return (
    <div className={className}>
      <div>
        {!data.video && (
          <Wrapper>
            <p className="text-gray-500">No video available</p>
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
            <div className="text-sm text-gray-400">3 mins ago</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
