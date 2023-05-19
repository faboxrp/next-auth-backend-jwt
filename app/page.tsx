"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import Button from "@elements/Button";

const HomePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState();

  const fetchPost = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/test/", {
        headers: {
          Authorization: `Bearer ${session?.token.access}`,
        },
      });

      const response = res.data;
      setPosts(response);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  return (
    <div>
      <Button onClick={fetchPost}>Get User Posts</Button>
      {posts && JSON.stringify(posts)}
    </div>
  );
};

export default HomePage;
