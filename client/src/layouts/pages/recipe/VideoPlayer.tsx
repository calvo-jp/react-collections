import IInstruction from 'types/instruction';

interface VideoPlayerProps extends React.ComponentProps<'video'> {
  data?: IInstruction;
}

const VideoPlayer = ({ data, className, ...props }: VideoPlayerProps) => {
  return (
    <div className={className}>
      <div>
        {data && data.video && (
          <video
            src={data.video}
            className="w-full aspect-video"
            controls
            {...props}
          />
        )}
      </div>

      {data && (
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
