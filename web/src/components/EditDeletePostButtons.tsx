import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface Props {
  id: number;
  creatorId: number;
}

const EditDeletePostButtons = ({ id, creatorId }: Props) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href={"/post/edit/[id]"} as={`/post/edit/${id}`}>
        <IconButton
          mr={2}
          colorScheme={"teal"}
          icon={<EditIcon />}
          aria-label={"delete post"}
          onClick={() => {}}
        />
      </NextLink>
      <IconButton
        colorScheme={"red"}
        icon={<DeleteIcon />}
        aria-label={"edit post"}
        onClick={() => {
          deletePost({ id });
        }}
      />
    </Box>
  );
};

export default EditDeletePostButtons;
