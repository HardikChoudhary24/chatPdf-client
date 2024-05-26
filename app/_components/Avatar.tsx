"use client";
import React, { useEffect, useState } from "react";
import Avatar, { AvatarFullConfig, genConfig } from "react-nice-avatar";

const UserAvatar = () => {
  const [config, setConfig] = useState<
    Required<AvatarFullConfig> | undefined
  >();
  useEffect(() => {
    setConfig(genConfig());
  },[]);
  return (
    <div>
      {config && <Avatar className="w-16 h-16" {...config} />}
    </div>
  );
};

export default UserAvatar;
