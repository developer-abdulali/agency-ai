import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useStreamChat } from "../hooks/useStreamChat";
import PageLoader from "../components/PageLoader";

import "../styles/stream-chat-theme.css";

import {
  Chat,
  Channel,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import { UserButton } from "@clerk/clerk-react";
import { HashIcon, PlusIcon, UsersIcon } from "lucide-react";
import CustomChannelHeader from "../components/CustomChannelHeader";
import CreateChannelModal from "../components/CreateChannelModal";
import CustomChannelPreview from "../components/CustomChannelPreview";
import UsersList from "../components/UsersList";

const Home = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { chatClient, error, isLoading } = useStreamChat();

  const navigate = useNavigate();

  // set active channel from url params
  useEffect(() => {
    if (chatClient) {
      const channelId = searchParams.get("channel");
      if (channelId) {
        const channel = chatClient.channel("messaging", channelId);
        setActiveChannel(channel);
      }
    }
  }, [chatClient, searchParams]);

  if (error) return <p>Something went wrong...</p>;
  if (isLoading || !chatClient) return <PageLoader />;

  return (
    <div className="chat-wrapper select-none">
      <Chat client={chatClient}>
        <div className="chat-container">
          {/* left side */}
          <div className="str-chat__channel-list">
            <div className="team-channel-list">
              {/* header */}
              <div className="team-channel-list__header gap-4">
                <div onClick={() => navigate("/")} className="brand-container">
                  <img src="/logo.png" alt="Logo" className="brand-logo" />
                  <span className="brand-name">Slack</span>
                </div>
                <div className="user-button-wrapper">
                  <UserButton />
                </div>
              </div>

              {/* channel list */}
              <div className="team-channel-list__content">
                <div className="create-channel-section">
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="create-channel-btn"
                  >
                    <PlusIcon className="size-4" />
                    <span>Create Channel</span>
                  </button>
                </div>

                {/* channel list */}
                <ChannelList
                  filters={{ members: { $in: [chatClient?.user?.id] } }}
                  options={{ state: true, watch: true }}
                  Preview={({ channel }) => (
                    <CustomChannelPreview
                      channel={channel}
                      activeChannel={activeChannel}
                      setActiveChannel={(channel) =>
                        setSearchParams({ channel: channel.id })
                      }
                    />
                  )}
                  List={({ children, loading, error }) => (
                    <div className="channel-sections">
                      <div className="section-header">
                        <div className="section-title">
                          <HashIcon className="size-4" />
                          <span>Channels</span>
                        </div>
                      </div>

                      {/* todos: add better components here instead of just a simple text  */}
                      {loading && (
                        <div className="loading-message">
                          Loading channels...
                        </div>
                      )}
                      {error && (
                        <div className="error-message">
                          Error loading channels
                        </div>
                      )}

                      <div className="channels-list">{children}</div>

                      <div className="section-header direct-messages">
                        <div className="section-title">
                          <UsersIcon className="size-4" />
                          <span>Direct Messages</span>
                        </div>
                      </div>
                      <UsersList activeChannel={activeChannel} />
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          {/* right side */}
          <div className="chat-main">
            <Channel channel={activeChannel}>
              <Window>
                <CustomChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>

              <Thread />
            </Channel>
          </div>
        </div>

        {isCreateModalOpen && (
          <CreateChannelModal onClose={() => setIsCreateModalOpen(false)} />
        )}
      </Chat>
    </div>
  );
};

export default Home;
