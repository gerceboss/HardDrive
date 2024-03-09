import { HStack, Text, chakra } from "@chakra-ui/react";
import Link from "next/link";

export const Title = () => {
  return (
    <HStack as={Link} href="/" spacing={1} align="center">
      <Text
        fontSize="2xl"
        fontWeight="extrabold"
        textAlign={{
          base: "center",
          md: "left",
        }}
        pb={1}
      >
        <chakra.span color="primary.400">Cloudi</chakra.span>Fi
      </Text>
    </HStack>
  );
};
