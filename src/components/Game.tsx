import { useState, useEffect } from "react";
import "../styles/Game.css";
import { StoryData, StoryImage } from "../types/story";

const Game: React.FC = () => {
	const [storyData, setStoryData] = useState<StoryData | null>(null);
	const [currentBlockId, setCurrentBlockId] = useState<string>("");
	const [isLoading, setIsLoading] = useState(true);
	const [previousImage, setPreviousImage] = useState<StoryImage | null>(null);
	const [currentStoryPath, setCurrentStoryPath] = useState<string>("/assets/stories/story1");

	useEffect(() => {
		fetch(`${currentStoryPath}/story.json`)
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch story");
				return res.json();
			})
			.then((data: StoryData) => {
				setStoryData(data);
				setCurrentBlockId(data.entrypoint);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Error loading story:", error);
				setIsLoading(false);
			});
	}, []);
  const currentBlock = storyData?.storyblocks[currentBlockId];

	useEffect(() => {
		if (currentBlock?.image && currentBlock.image !== "prev") {
      setPreviousImage(currentBlock.image);
		}
	}, [currentBlockId]);
  
	const getCurrentImage = () => {
		if (!currentBlock?.image) return null;

		if (currentBlock.image === "prev") {
			return typeof previousImage === "object" ? previousImage : null;
		}

		return typeof currentBlock.image === "string"
			? { src: currentBlock.image }
			: currentBlock.image;
	};

	const currentImage = getCurrentImage();
	return (
		<div className="game-container">
			{currentBlock?.image && currentImage && (
				<div
					className="background-image"
					style={{
						backgroundImage: `
        linear-gradient(180deg, #000 0%, rgba(22, 17, 17, 0) 36.5%),
        linear-gradient(180deg, rgba(0, 0, 0, 0.00) 56%, #000 100%),
        url(${currentStoryPath}/${currentImage.src})
      `,
						backgroundPosition: `${currentImage.offset?.x ?? "50%"} ${
							currentImage.offset?.y ?? "50%"
						}`,
						backgroundSize: currentImage.scale
							? `${currentImage.scale}`
							: "cover",
					}}
				/>
			)}

			<div className="story-container">
				{isLoading ? (
					<p className="loading-text">Loading story...</p>
				) : (
					<>
						<p className="story-text">{currentBlock?.content}</p>
						<div className="choices-container">
							{currentBlock?.choices?.map((choice, index) => (
								<button
									key={`${choice.id}-${index}`}
									className="choice-btn"
									onClick={() => setCurrentBlockId(choice.id)}
								>
									{choice.text}
								</button>
							))}
						</div>

						{!currentBlock?.choices && storyData && (
							<button
								className="restart-btn"
								onClick={() => setCurrentBlockId(storyData.entrypoint)}
							>
								Play Again
							</button>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Game;
