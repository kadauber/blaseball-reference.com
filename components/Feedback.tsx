/* eslint-disable jsx-a11y/accessible-emoji */
import * as React from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Box, Fade, Flex, IconButton, Text } from "@chakra-ui/react";

const persistentEmojis = [
  {
    id: "yes",
    label: "Yes",
    emoji: "🤠",
  },
  {
    id: "no",
    label: "No",
    emoji: "😭",
  },
];

const randomEmojis = [
  {
    id: "crystalBall",
    label: "Crystal ball",
    emoji: "🔮",
  },
  {
    id: "timerClock",
    label: "Timer clock",
    emoji: "⏲",
  },
  {
    id: "firecracker",
    label: "Firecracker",
    emoji: "🧨",
  },
  {
    id: "football",
    label: "Football",
    emoji: "🏈",
  },
  {
    id: "boomerang",
    label: "Boomerang",
    emoji: "🪃",
  },
  {
    id: "smilingFaceWithHorns",
    label: "Smiling face with horns",
    emoji: "😈",
  },
  {
    id: "clownFace",
    label: "Clown face",
    emoji: "🤡",
  },
  {
    id: "ghost",
    label: "Ghost",
    emoji: "👻",
  },
  {
    id: "unicorn",
    label: "Unicorn",
    emoji: "🦄",
  },
  {
    id: "spoutingWhale",
    label: "Spouting whale",
    emoji: "🐳",
  },
];

function Feedback() {
  const router = useRouter();

  const [status, setStatus] = React.useState("");
  const [emojis, setEmojis] = React.useState(persistentEmojis);

  React.useEffect(() => {
    if (emojis.length === 2) {
      setEmojis([
        ...emojis,
        ...randomEmojis.sort(() => 0.5 - Math.random()).slice(0, 2),
      ]);
    }
  }, []);

  const handleEmojiSelect = async (emoji) => {
    await fetch("/api/feedback", {
      method: "POST",
      mode: "same-origin",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emoji: emoji.emoji,
        emojiId: emoji.id,
        page: router.asPath,
      }),
    });

    setStatus("submitted");
  };

  return (
    <Flex
      alignItems="center"
      borderBottom="1px"
      borderTop="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="space-evenly"
      flexWrap="wrap"
      mt={8}
      p={4}
    >
      {status === "submitted" ? (
        <Fade in={status === "submitted"}>
          <SuccessfulSubmission />
        </Fade>
      ) : (
        <>
          <Box fontSize="sm" mb={2} textAlign="center" width="100%">
            Was this page helpful?
          </Box>
          <Flex>
            {emojis.map((emoji) => (
              <IconButton
                aria-label={emoji.label}
                key={emoji.id}
                mr={2}
                onClick={() => handleEmojiSelect(emoji)}
              >
                <Text as="span" display="block" fontSize="xl" role="img">
                  {emoji.emoji}
                </Text>
              </IconButton>
            ))}
          </Flex>
        </>
      )}
    </Flex>
  );
}

function SuccessfulSubmission() {
  return (
    <Box fontSize="sm" textAlign="center">
      <Text mb={2}>Your feedback has been received!</Text>
      <Text>Thank you for your help.</Text>
    </Box>
  );
}

export default Feedback;
