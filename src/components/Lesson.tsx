import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";
import ClassNames from "classnames";
import classNames from "classnames";

interface props {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export const Lesson = (props: props) => {
  const { slug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(
    props.availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    { locale: ptBR }
  );

  const isActiveLesson = props.slug === slug;

  console.log(slug);

  return (
    <Link className="group" to={`/event/lesson/${props.slug}`}>
      <span className="text-gray-300">{availableDateFormatted}</span>
      <div
        className={`rounded border border-gray500 p-4 mt-2 group-hover:border-green-500 relative ${
          isActiveLesson &&
          "bg-green-500 border-green-500 before:content-[' '] before:absolute before:w-3 before:h-3 before:top-[40%] before:left-[-4%] before:z-[2] before:border-green-500 before:border-r-[10px] before:border-t-[10px] before:border-b-[10px] before:border-t-transparent before:border-b-transparent"
        }`}
      >
        <header className="flex items-center justify-between ">
          {isLessonAvailable ? (
            <span
              className={classNames(
                "text-sm  font-medium flex items-center gap-2",
                {
                  "text-white": isActiveLesson,
                  "text-blue-500": !isActiveLesson,
                }
              )}
            >
              <CheckCircle size={20} />
              Conteúdo Liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span
            className={classNames(
              "text-xs rounded py[2px] px-2 text-white border",
              {
                "border-white": isActiveLesson,
                "border-green-300": !isActiveLesson,
              }
            )}
          >
            {props.type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>
        <strong
          className={classNames(" mt-5 block", {
            "text-white": isActiveLesson,
            "text-gray-200": !isActiveLesson,
          })}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  );
};
