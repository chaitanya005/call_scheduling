import DetailsSection from '../../../../components/listings/Details';

export default function Details({listing}) {
  // console.log(listing)
  return (
    <DetailsSection listing={listing} isAdvisorSide={true}/>
  );
};

