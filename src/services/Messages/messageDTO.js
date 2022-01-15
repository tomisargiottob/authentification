function returnMessages(rawMessages) {
  if (Array.isArray(rawMessages)) {
    const messages = rawMessages.map((message) => ({
      id: message.id,
      user: message.user,
      text: message.text,
      time: message.time,
    }));
    return messages;
  }
  return ({
    id: rawMessages.id,
    user: rawMessages.user,
    text: rawMessages.text,
    time: rawMessages.time,
  });
}

module.exports = returnMessages;
