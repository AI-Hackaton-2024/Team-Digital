import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import Navbar from "../../main/Navbar/Navbar";
import styles from "./ChatPage.module.css";
import { chatService } from "../../../services/chatService";

function ChatPage({ threadId }) {
    const [messages, setMessages] = useState([]);
    const [oldMessages, setOldMessages] = useState([]);
    const [question, setQuestion] = useState("");
    const [initState, setInitState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const questionInput = useRef();
    const messageContainerRef = useRef(null);
    const sendQuestion =  async() => {
      setInitState(true);
      setIsLoading(true);
      // questionInput.current.querySelector('input').value = "";
      setMessages([...messages, question]);
      setOldMessages([...oldMessages, { role: 'user', message: question }]);

      await chatting();
    }

    useEffect(() => {
        if (messageContainerRef.current) {
          messageContainerRef.current?.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    const chatting = async () => {
        console.log(threadId);
        const ch = await chatService.sendPrompt(threadId);
        console.log("chat:", ch);

        setMessages(ch);

        setIsLoading(false); // Stop loading after the response is received
    };

    useEffect(() => {
      const interval = setInterval(() => {
        chatting();
      }, 500);
      return () => {
      clearInterval(interval);
    };
    }, []);

    return (
        <div className={styles.chatContainer}>
            <Navbar menu = {"chat"}/>
            {initState ? (
                <div className={styles.chatPanel}>
                    <div className={styles.messageContainer}>
                        {messages.map((message, index) => (
                            <div key={index} className={styles.messageDisplay}>
                                {index % 2 === 0 ? (
                                    <p className={styles.userQuestion}  ref={messageContainerRef}>{message.content}</p>
                                ) : (
                                    <ReactMarkdown className={styles.chatAnswer}>{message.content}</ReactMarkdown>
                                )}
                            </div>
                        ))}
                    </div>
                    {isLoading && <p className={`${styles.chatAnswer} ${styles.answerWait}`}><span className={styles.loadingDots} /></p>}
                </div>
            ) : (
                <div className={styles.chatPanelInit}></div>
            )}
            <div className={styles.questionPanel}>
                <div className={styles.textFieldContainer}>
                    <input
                        type="text"
                        className={styles.questionInputTextAreaDisLike}
                        placeholder="Write something..."
                        onChange={(e) => setQuestion(e.target.value)}
                        value={question}
                        ref={questionInput}
                    />
                    <button className={styles.buttonSend} onClick={sendQuestion} aria-label="Ask question button">Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;