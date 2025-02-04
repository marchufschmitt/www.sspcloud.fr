import type { ReactComponent } from "onyxia-ui/tools/ReactComponent";

const separator = "xDsOpdIxIdK";

const urlRegExp = /https?[^ ]+/g;

function splitByUrl(str: string): string[] {
    return str
        .replace(urlRegExp, match => ["", match, ""].join(separator))
        .split(separator);
}

function getUrlDomain(urlStr: string) {
    return urlStr.match(/\/\/([^/]+)/)![1];
}

export function createInjectLinks(params: {
    Link: ReactComponent<{
        href: string;
        children: string;
    }>;
}) {
    const { Link } = params;

    function injectLinks(text: string): JSX.Element[] {
        return splitByUrl(text).map(part => (
            <span key={part}>
                {urlRegExp.test(part) ? (
                    <Link href={part}>{getUrlDomain(part)}</Link>
                ) : (
                    part
                )}
            </span>
        ));
    }

    return { injectLinks };
}
