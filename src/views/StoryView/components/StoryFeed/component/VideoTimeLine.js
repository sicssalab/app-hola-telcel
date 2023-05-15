import { View, Text } from "react-native";
const VideoTimeLine = (props) => {
    const {videoStatus} = props;
    const totalTime = videoStatus.playableDurationMillis;
    const currentTime = videoStatus.positionMillis;
    const currentTimePercentaje = (currentTime * 100) / totalTime;

    return ( 
        <View style={{ width: `${currentTimePercentaje}%`, backgroundColor: "gold", height: 3, top: 0, position: "absolute"}} />
    );
}
 
export default VideoTimeLine;