import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

type Props = {
  post: PostSnippetFragment;
};

const UpdootSection = ({ post }: Props) => {
  const [, vote] = useVoteMutation();
  return (
    <Flex direction={"column"} alignItems="center" justifyContent={"center"}>
      <IconButton
        onClick={() => {
          if (post.voteStatus === 1) {
            return;
          }
          vote({
            postId: post._id,
            value: 1,
          });
        }}
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        icon={<ChevronUpIcon />}
        aria-label={"updoot post"}
      />
      {post.points}
      <IconButton
        onClick={() => {
          if (post.voteStatus === -1) {
            return;
          }
          vote({
            postId: post._id,
            value: -1,
          });
        }}
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        icon={<ChevronDownIcon />}
        aria-label={"downdoot post"}
      />
    </Flex>
  );
};

export default UpdootSection;
