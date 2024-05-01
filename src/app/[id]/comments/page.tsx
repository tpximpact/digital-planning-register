"use client";
import { useEffect, useState } from "react";
import { getApplicationById } from "../../../actions";
import { BackLink } from "../../../components/button";
import ReactPaginate from "react-paginate";
import { NextIcon, PreviousIcon } from "../../../../public/icons";
import ApplicationComments from "../../../components/application_comments";
import ApplicationHeader from "../../../components/application_header";
import React from "react";
import Pagination from "@/components/pagination";

export default function Comments({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams?: { type?: string };
}) {
  const [data, setData] = useState<any>();
  const [currentPage, setCurrentPage] = useState(0);
  const maxDisplayComments = 10;

  useEffect(() => {
    const fetchData = async () => {
      const applicationData = await getApplicationById(
        parseFloat(id as string),
      );
      setData(applicationData);
    };

    fetchData();
  }, [id]);

  const type = searchParams?.type ?? "published";
  const commentsType = type === "consultee" ? "consultee" : "published";
  const comments =
    commentsType === "consultee"
      ? data?.consultee_comments
      : data?.published_comments;

  const sortedComments = comments?.sort((a: any, b: any) => {
    const dateA = a.received_at ? new Date(a.received_at).getTime() : 0;
    const dateB = b.received_at ? new Date(b.received_at).getTime() : 0;
    return dateB - dateA;
  });

  const totalComments = sortedComments?.length ?? 0;

  const indexOfLastComment = (currentPage + 1) * maxDisplayComments;
  const indexOfFirstComment = indexOfLastComment - maxDisplayComments;
  const currentComments = sortedComments?.slice(
    indexOfFirstComment,
    indexOfLastComment,
  );
  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  const showPagination = (comments?.length ?? 0) > maxDisplayComments;
  const preview = currentPage === 0 ? "" : <PreviousIcon />;
  const next =
    currentPage === Math.ceil(comments?.length / maxDisplayComments) - 1 ? (
      ""
    ) : (
      <NextIcon />
    );

  return (
    <div>
      <BackLink href={`/${id}`} />
      {data && (
        <div className="govuk-main-wrapper">
          <ApplicationHeader
            reference={data.reference_in_full}
            address={data.site}
          />
          <ApplicationComments
            {...data}
            id={id}
            maxDisplayComments={10}
            showViewAllButton={false}
            type={type}
            comments={currentComments}
            totalComments={totalComments}
            currentPage={currentPage}
          />
          {showPagination && (
            <Pagination
              currentPage={currentPage}
              totalItems={totalComments}
              itemsPerPage={maxDisplayComments}
              onPageChange={handlePageClick}
            />
          )}
        </div>
      )}
    </div>
  );
}
