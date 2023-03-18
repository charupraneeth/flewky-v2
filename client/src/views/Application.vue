<script setup lang="ts">
import { onMounted, ref, VNodeRef } from "vue";

const configuration = {
  configuration: {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
  },
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    {
      urls: "turn:numb.viagenie.ca",
      username: "vimrrembmvebxcunca@sdvgeft.com",
      credential: "LbPCDcA9aub6sPV",
    },
    {
      urls: "turn:numb.viagenie.ca",
      username: "webrtc@live.com",
      credential: "muazkh",
    },
  ],
};
const handleIceCandidate = (event: RTCPeerConnectionIceEvent) => {
  console.log("gen candidate ", event.candidate);
};

const handleIceCandidateError = (event: any) => {
  console.log("error candidate ", event);
};

function handleConnectionStateChange() {
  const failedStates = ["disconnected", "failed", "closed"];
  console.log("states ", peerConnection.connectionState);
}
async function handleIceStateChange(event: Event) {
  console.log("ICE state change event: ", event);
}

const videoElementRef = ref<HTMLVideoElement | undefined>();
const peerConnection = new RTCPeerConnection(configuration);
let localStream: MediaStream | null,
  remoteStream = new MediaStream();
peerConnection.addEventListener("icecandidate", handleIceCandidate);
peerConnection.addEventListener("icecandidateerror", handleIceCandidateError);
peerConnection.addEventListener(
  "iceconnectionstatechange",
  handleIceStateChange
);
peerConnection.addEventListener(
  "connectionstatechange",
  handleConnectionStateChange
);

async function playVideoFromCamera() {
  try {
    const constraints = { video: true, audio: true };
    localStream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElementRef.value && (videoElementRef.value.srcObject = localStream);

    localStream.getTracks().forEach((track) => {
      localStream && peerConnection.addTrack(track, localStream);
    });
  } catch (error) {
    console.error("Error opening video camera.", error);
  }
}

onMounted(() => {
  console.log(videoElementRef.value);
  playVideoFromCamera();
});
</script>
<template>
  <h1>Welcome to App</h1>
  <video ref="videoElementRef" autoplay playsinline muted="true"></video>
</template>
