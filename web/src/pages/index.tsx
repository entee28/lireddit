import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";
import UpdootSection from "../components/UpdootSection";
import {
  useDeletePostMutation,
  useMeQuery,
  usePostsQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as string | null,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }

  return (
    <Layout>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p._id} gap={8} p={5} shadow="md" borderWidth={"1px"}>
                <UpdootSection post={p} />
                <Box flex={1}>
                  <Link>
                    <NextLink href="/post/[id]" as={`/post/${p._id}`}>
                      <Heading fontSize={"xl"}>{p.title}</Heading>
                    </NextLink>
                  </Link>
                  <Text color={"gray.400"}>posted by {p.creator.username}</Text>
                  <Flex align={"center"}>
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>
                    {meData?.me?.id === p.creatorId ? (
                      <Box ml={"auto"}>
                        <NextLink
                          href={"/post/edit/[id]"}
                          as={`/post/edit/${p._id}`}
                        >
                          <IconButton
                            as={Link}
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
                            deletePost({ id: p._id });
                          }}
                        />
                      </Box>
                    ) : null}
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
            isLoading={fetching}
            m="auto"
            my={8}
            colorScheme="teal"
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
