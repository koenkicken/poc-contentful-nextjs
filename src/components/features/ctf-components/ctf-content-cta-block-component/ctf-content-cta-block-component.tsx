import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface ContentCtaBlock {
  buttonText: string;
  buttonLink: string;
  blockImage?: {
    title: string;
    description: string;
    contentType: string;
    url: string;
    width: string;
    height: string;
  };
  blockBody: any;
  blockTitle: any;
}

export default function CtfContentCtaBlockComponent(props: ContentCtaBlock) {
  const { buttonText, buttonLink, blockImage, blockBody, blockTitle } = props;
  return (
    <div className="flex w-full max-w-[455px] flex-row gap-x-[75px]">
      <img
        width="75px"
        className="place-self-start"
        alt="icon"
        src={blockImage?.url}
      />
      <div>
        <h3 className="text-2xl text-blue-900">{blockTitle}</h3>
        <div className="my-3 h-auto">
          {documentToReactComponents(blockBody.json)}
        </div>
        <button className="mt-6 bg-orange-500 px-5 py-3.5 text-sm text-white">
          {buttonText}
        </button>
      </div>
    </div>
  );
}