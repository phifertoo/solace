import React from "react";
import { Box, Text, Link, VStack, Divider, Skeleton } from "@chakra-ui/react";
import NoteForm from "./NoteForm";
import NoteList from "./Notelist";
import SearchBar from "./SearchBar";
import Title from "./Title";
import EmptyState from "./EmptyState";
import { useNotes } from "./providers/NotesProvider";
import { useAuth } from "./providers/AuthProvider";

const Main: React.FC = () => {
  const { notes, isLoading } = useNotes();
  const { isLoading: authLoading } = useAuth();

  return (
    <Box width="100%" maxW="800px" mx="auto" px={4} py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Title title="Lance Watanabe's Notes Project" />
          <Text mt={4} fontSize="lg" lineHeight="tall">
            Please SSO google login to start a session. After you login, you can
            type a note between 20 and 300 characters in the textarea below. You
            can also edit, delete a note, or search for a string in a note. If
            you like what you see or have any questions, feel free to to{" "}
            <Link
              href="mailto:lancekwatanabe58@gmail.com"
              color="teal.500"
              isExternal
            >
              email me
            </Link>
            .
          </Text>
        </Box>
        <Divider borderColor="gray.800" my={8} />
        <Box>
          <Title title="Write a New Note" />
          <NoteForm />
        </Box>
        <Divider borderColor="gray.800" my={8} />
        <Box>
          <Title title="Your Notes" />
          {authLoading || isLoading ? (
            <Skeleton
              data-testid="loading-skeleton"
              width="100%"
              height="300px"
            />
          ) : notes.length > 0 ? (
            <>
              <SearchBar />
              <NoteList />
            </>
          ) : (
            <EmptyState />
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default Main;
