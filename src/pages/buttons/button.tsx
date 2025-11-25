import DotExpandButton from "@/components/buttons/dotExpand"
import NeuButton from "@/components/buttons/neu"
import NeuFollowButton from "@/components/buttons/neubutton"
import ButtonWrapper from "@/components/buttons/splashbutton"

const ButtonPage = () => {
    return (<>

        <div className="flex min-h-[200px] items-center justify-center bg-neutral-900">
            <ButtonWrapper />
        </div>
        <NeuFollowButton />
        <DotExpandButton />
        <NeuButton />


    </>)
}
export default ButtonPage