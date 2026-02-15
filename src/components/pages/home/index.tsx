import Button from "../../molecules/button";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4 max-w-[512px] items-center justify-center w-full">
      <Button className="w-full">
        Easy <span className="text-sm">(6-8 letters)</span>
      </Button>
      <Button className="w-full">
        Medium <span className="text-sm">(9-11 letters)</span>
      </Button>
      <Button className="w-full">
        Hard <span className="text-sm">(12-14 letters)</span>
      </Button>
    </div>
  );
};

export default HomePage;
