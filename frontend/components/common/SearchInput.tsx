import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  ResponsiveValue,
  Stack,
  StackProps,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { LuArrowRight, LuSearch } from "react-icons/lu";

export const SearchInput = ({
  hasDetails,
  size,
  ...props
}: {
  size?: ResponsiveValue<InputProps["size"]>;
  hasDetails?: boolean;
} & StackProps) => {
  const router = useRouter();
  const [input, setInput] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (input) {
          //
        }
      }}
    >
      <Stack align="center" spacing={1} textAlign="center" {...props}>
        <InputGroup
          w={["full", null, "lg"]}
          variant="filled"
          size={size as any}
        >
          <InputLeftElement>
            <Icon as={LuSearch} />
          </InputLeftElement>
          <Input
            placeholder="Search by block number, tx hash or address"
            _focus={{
              bg: "whiteAlpha.100",
              border: "1 solid",
              borderColor: "whiteAlpha.50",
              transition: "all 0.2s ease-in-out",
            }}
            onChange={(e) => setInput(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              icon={<Icon as={LuArrowRight} />}
              aria-label="Search"
              variant="ghost"
              type="submit"
            />
          </InputRightElement>
        </InputGroup>
        {hasDetails && (
          <Text fontSize="sm" color="gray.200" as="i">
            {"{chainId}/{blockNumber} or {txHash} or {address}"}
          </Text>
        )}
      </Stack>
    </form>
  );
};
