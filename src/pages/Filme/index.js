import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./filme.css";
import api from "../../services/api";
import { toast } from "react-toastify";

function Filme() {
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadFilme() {
            await api.get(`movie/${id}`, {
                params: {
                    api_key: "da8beefd8d201a2224d0bed08815c4f3",
                    language: "pt-BR",
                },
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                navigate("/", {replace: true});
                return;
            })
        }
        loadFilme();

        return() => {
            console.log('componente desmontado');
        }
    }, [navigate, id]);

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@filmes");
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

        if (hasFilme) {
            toast.warn("Esse filme ja foi salvo");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@filmes", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!");
    }

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando Detalhes...</h1>
            </div>
        );
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
                alt={filme.title}
            />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliacao: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a
                        href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
                        target="blank"
                    >
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Filme;
